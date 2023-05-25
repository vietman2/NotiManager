import base64
import hashlib
import hmac
import time
from logging import getLogger

import requests
from django.conf import settings
from django.utils import timezone

from noti_manager.celery import app
from notifications.models import Notification, EnumNotificationStatus

logger = getLogger(__name__)


@app.task
def task_send_sms_notification(notification_data):
    """Send a notification to the notification service."""
    endpoint = notification_data['endpoint']
    data = notification_data['data']

    headers = create_ncloud_headers()
    request_data = {
        "type": "SMS",
        "contentType": "COMM",
        "countryCode": "82",
        "from": settings.SMS_SENDER,  # phone number
        "content": "내용",
        "messages": [
            {
                "to": endpoint,
                "content": data
            }
        ]
    }
    started_at = timezone.now()
    response = requests.post(
        url=settings.NCLOUD_SMS_ENDPOINT,
        timeout=10,
        json=request_data,
        headers=headers,
    )
    finished_at = timezone.now()
    try:
        response.raise_for_status()
    except requests.exceptions.RequestException:
        logger.info(response.text)
        notification = Notification.objects.get(id=notification_data['id'])
        notification.update_result(
            # pylint: disable=C0301
            EnumNotificationStatus.FAILURE, response.status_code, response.text, started_at, finished_at
        )

        return

    notification = Notification.objects.get(id=notification_data['id'])
    notification.update_result(
        EnumNotificationStatus.SUCCESS, response.status_code, response.text, started_at, finished_at
    )


def create_ncloud_headers():
    """Create headers for ncloud sms service."""
    access_key = settings.NCLOUD_ACCESS_KEY
    secret_key = bytes(settings.NCLOUD_SECRET_KEY, 'UTF-8')

    method = 'POST'
    uri = f'/sms/v2/services/{settings.NCLOUD_SERVICE_ID}/messages'
    timestamp = str(int(time.time() * 1000))
    message = f'{method} {uri}\n{timestamp}\n{access_key}'
    message = bytes(message, 'UTF-8')
    signature = base64.b64encode(hmac.new(secret_key, message, digestmod=hashlib.sha256).digest())

    return {
        'Content-Type': 'application/json; charset=utf-8',
        'x-ncp-apigw-timestamp': timestamp,
        'x-ncp-iam-access-key': access_key,
        'x-ncp-apigw-signature-v2': signature,
    }
