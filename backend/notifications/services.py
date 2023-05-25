from __future__ import annotations

from datetime import timedelta
from logging import getLogger
from typing import TypedDict

import requests
from django.utils import timezone

from noti_manager.celery import app
from notifications.models import (
    Notification,
    EnumNotificationStatus,
    EnumNotificationType,
    Reservation,
    EnumReservationStatus,
    EnumNotificationMode,
)
from notifications.slack.serializers import SlackNotificationSerializer
from notifications.slack.services import task_send_slack_notification
from notifications.sms.services import task_send_sms_notification
from notifications.email.services import task_send_gmail_notification

logger = getLogger(__name__)


@app.task
def task_send_api_notification(notification: NotificationTaskDto):
    """Send a notification to the notification service."""
    request_data = notification['data']
    url = notification['endpoint']
    headers = notification['headers']

    started_at = timezone.now()
    response = requests.post(
        url=url,
        json=request_data,
        headers=headers,
        timeout=5,
    )
    finished_at = timezone.now()
    try:
        response.raise_for_status()
    except requests.exceptions.RequestException:
        logger.info(response.text)
        notification = Notification.objects.get(id=notification['id'])
        # pylint: disable=R0801
        notification.update_result(
            EnumNotificationStatus.FAILURE,
            response.status_code,
            response.text,
            started_at,
            finished_at
        )

        return

    notification = Notification.objects.get(id=notification['id'])
    # pylint: disable=R0801
    notification.update_result(
        EnumNotificationStatus.SUCCESS,
        response.status_code,
        response.text,
        started_at,
        finished_at
    )

    return

class NotificationTaskDto(TypedDict):
    """Data transfer object for notifications."""
    id: int
    endpoint: str
    headers: dict
    data: str


class GmailNotificationTaskDto(TypedDict):
    """Data transfer object for notifications."""
    id: int
    token: dict
    endpoint: str
    subject: str
    content: str


@app.task
def task_spawn_notification_by_chunk(reservation_id: int):
    reservation = Reservation.objects.select_related('notification_config').get(id=reservation_id)
    notification_ids = reservation.notification_set.values_list('id', flat=True)

    def split_notification_ids_by_chunk_size(ids: list[int], chunk_size) -> list[list[int]]:
        return [
            ids[offset:offset + chunk_size]
            for offset in range(0, len(ids), chunk_size)
        ]

    CHUNK_SIZE = 100
    notification_ids_by_chunk_size = \
        split_notification_ids_by_chunk_size(notification_ids, CHUNK_SIZE)
    for notification_ids in notification_ids_by_chunk_size:
        task_handle_chunk_notification.delay(notification_ids)

    reservation.status = EnumReservationStatus.SENDING
    reservation.save(update_fields=['status'])


@app.task
def task_handle_chunk_notification(notification_ids: list[int]):
    """Send a notification to the notification service."""
    notifications = Notification.objects \
        .filter(id__in=notification_ids, status=EnumNotificationStatus.PENDING) \
        .select_related('target_user', 'reservation')

    for notification in notifications:
        # TODO 하나의 클래스로 추상화 해서 바로 던지는 게 좋을 듯
        if notification.reservation.notification_config.type == EnumNotificationType.WEBHOOK:
            data = NotificationTaskDto(
                id=notification.id,
                endpoint=notification.target_user.endpoint,
                headers=notification.target_user.data,
                data=notification.reservation.notification_config.nmessage.data.get('message'),
            )
            task_send_api_notification.delay(data)
        elif notification.reservation.notification_config.type == EnumNotificationType.SLACK:
            task_send_slack_notification.delay(
                notification_data=SlackNotificationSerializer(notification).data
            )
        elif notification.reservation.notification_config.type == EnumNotificationType.SMS:
            data = NotificationTaskDto(
                id=notification.id,
                endpoint=notification.target_user.endpoint,
                headers=notification.target_user.data,
                data=notification.reservation.notification_config.nmessage.data.get('message'),
            )
            task_send_sms_notification.delay(data)
        elif notification.reservation.notification_config.type == EnumNotificationType.EMAIL:
            token = notification.reservation.notification_config.project.user.token
            data = GmailNotificationTaskDto(
                id=notification.id,
                token=token,
                endpoint=notification.target_user.endpoint,
                subject=notification.reservation.notification_config.nmessage.data.get('title'),
                content=notification.reservation.notification_config.nmessage.data.get('message'),
            )
            task_send_gmail_notification.delay(data)


@app.task
def cron_task_handle_reservation():
    # TODO (Jaeyoung) 분산락
    reservations = Reservation.objects \
        .filter(status=EnumReservationStatus.PENDING) \
        .filter(reserved_at__lte=timezone.now() + timedelta(minutes=1))

    for reservation in reservations:
        task_spawn_notification_by_chunk.delay(reservation.id)


@app.task
def task_bulk_create_notification(reserved_at, target_user_ids, notification_config_id, mode):
    reservation = Reservation.objects.create(
        notification_config_id=notification_config_id,
        reserved_at=reserved_at,
        status=EnumReservationStatus.PENDING
    )

    notifications = [
        Notification(
            target_user_id=target_user_id,
            reservation_id=reservation.id,
            status=EnumNotificationStatus.PENDING,
        ) for target_user_id in target_user_ids
    ]
    Notification.objects.bulk_create(notifications)

    if mode == EnumNotificationMode.IMMEDIATE:
        task_spawn_notification_by_chunk(reservation.id)
