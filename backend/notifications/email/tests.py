from unittest import TestCase, mock

from model_bakery import baker

from notifications.email.services import task_send_gmail_notification
from notifications.models import Notification, EnumNotificationType
from targetusers.models import TargetUser


class EmailServiceTestCase(TestCase):

    @mock.patch('requests.post', return_value=mock.Mock(status_code=200, text=''))
    def test_task_send_gmail_notification(self, _):
        # pylint: disable=R0801
        target_user = baker.make(
            TargetUser, notification_type=EnumNotificationType.SLACK
        )
        notification = baker.make(
            Notification,
            target_user=target_user
        )
        task_send_gmail_notification({
            'id': notification.id,
            'token': {
                'access_token': '',
                'expired': ''
            },
            'endpoint': '',
            'subject': '',
            'content': ''
        })

    @mock.patch('requests.post', return_value=mock.Mock(status_code=400, text=''))
    def test_task_send_gmail_notification_fail(self, _):
        target_user = baker.make(
            TargetUser, notification_type=EnumNotificationType.SLACK
        )
        notification = baker.make(
            Notification,
            target_user=target_user
        )
        task_send_gmail_notification({
            'id': notification.id,
            'token': {
                'access_token': '',
                'expired': ''
            },
            'endpoint': '',
            'subject': '',
            'content': ''
        })
