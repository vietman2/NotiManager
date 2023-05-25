from __future__ import annotations

from urllib.parse import urljoin

import requests
from celery.utils.log import get_task_logger
from django.conf import settings

from core.rate_limit import rate_limit
from noti_manager.celery import app
from notifications.models import Notification, EnumNotificationStatus

logger = get_task_logger(__name__)


@app.task(bind=True)
@rate_limit(maximum_allowed_per_minute=60)
# pylint: disable=W0613
def task_send_slack_notification(self, notification_data):
    url = urljoin(settings.SLACK_HOST, 'api/chat.postMessage')
    headers = {
        'Authorization': f'Bearer {notification_data["api_key"]}',
    }
    data = {
        'text': notification_data['text'],
        'channel': notification_data['channel']
    }
    response = requests.post(
        url,
        headers=headers,
        json=data,
        timeout=5
    )
    try:
        response.raise_for_status()
        data = response.json()
        if data['ok']:
            Notification.objects.filter(pk=notification_data['id']).update(
                status=EnumNotificationStatus.SUCCESS
            )
        else:
            logger.info(data)
            Notification.objects.filter(pk=notification_data['id']).update(
                status=EnumNotificationStatus.FAILURE
            )

    except requests.exceptions.RequestException:
        logger.info(response.text)
        Notification.objects.filter(pk=notification_data['id']).update(
            status=EnumNotificationStatus.FAILURE
        )
