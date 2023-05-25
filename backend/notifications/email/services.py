from __future__ import print_function

import base64
from email.message import EmailMessage
from logging import getLogger

import requests
from django.utils import timezone

from noti_manager.celery import app
from notifications.models import Notification, EnumNotificationStatus

logger = getLogger(__name__)


@app.task
def task_send_gmail_notification(notification_task_dto):
    token = notification_task_dto['token']
    to = notification_task_dto['endpoint']
    subject = notification_task_dto['subject']
    content = notification_task_dto['content']

    access_token = token.get("access_token")
    token.get("expired")
    token.get('access_token')

    message = EmailMessage()
    message.set_content(content)
    message['To'] = to
    message['Subject'] = subject

    # encoded message
    encoded_message = base64.urlsafe_b64encode(message.as_bytes()).decode()

    request_data = {
        'raw': encoded_message
    }

    # encoded message
    headers = {
        'Authorization': f'Bearer {access_token}',
        'Content-Type': 'application/json'
    }
    started_at = timezone.now()
    response = requests.post(
        # pylint: disable=C0301
        url=f'https://www.googleapis.com/gmail/v1/users/me/messages/send?access_token={access_token}',
        json=request_data,
        timeout=5,
        headers=headers,
    )
    finished_at = timezone.now()
    notification = Notification.objects.get(id=notification_task_dto['id'])
    try:
        response.raise_for_status()
    except requests.exceptions.RequestException:
        logger.info(response.text)
        notification.update_result(
            EnumNotificationStatus.FAILURE,
            response.status_code,
            response.text,
            started_at,
            finished_at
        )

    notification.update_result(
        EnumNotificationStatus.SUCCESS,
        response.status_code,
        response.text,
        started_at,
        finished_at
    )
