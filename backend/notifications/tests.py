from datetime import datetime, timedelta
from unittest import mock
from unittest.mock import call

from django.test import TestCase
from django.utils import timezone
from model_bakery import baker
from rest_framework.test import APITestCase

from account.models import User
from nmessages.models import NMessage
from notifications.models import (
    EnumNotificationType,
    NotificationConfig,
    Reservation,
    Notification,
    EnumNotificationStatus, EnumReservationStatus, EnumNotificationMode,
)
from notifications.services import (
    task_send_api_notification,
    task_spawn_notification_by_chunk,
    task_bulk_create_notification,
    task_handle_chunk_notification, cron_task_handle_reservation, )
from notifications.slack.services import task_send_slack_notification
from notifications.sms.services import task_send_sms_notification
from project.models import Project
from targetusers.models import TargetUser


class NotificationAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_metrics(self):
        # Given
        start = timezone.now()
        end = start + timezone.timedelta(hours=1)
        project = baker.make(Project, user=self.user)
        notification_config = baker.make(NotificationConfig, project=project)
        reservation = baker.make(Reservation, notification_config=notification_config)

        baker.make(
            Notification,
            reservation=reservation,
            status=EnumNotificationStatus.SUCCESS,
            updated_at=start,
            _quantity=2
        )
        baker.make(
            Notification,
            reservation=reservation,
            status=EnumNotificationStatus.FAILURE,
            updated_at=end
        )

        start_str = start.strftime('%Y-%m-%d %H:%M:%S')
        end_str = end.strftime('%Y-%m-%d %H:%M:%S')

        # When
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            f'/api/notification/metrics/?start={start_str}&end={end_str}&interval=hour'
        )

        # Then
        self.assertEqual(response.status_code, 200)

    def test_metrics_optional_query_params(self):
        # Given
        start = timezone.now()
        end = start + timezone.timedelta(hours=1)
        project = baker.make(Project, user=self.user)
        notification_config = baker.make(NotificationConfig, project=project)
        reservation = baker.make(Reservation, notification_config=notification_config)

        baker.make(
            Notification,
            reservation=reservation,
            status=EnumNotificationStatus.SUCCESS,
            updated_at=start,
            _quantity=2
        )
        baker.make(
            Notification,
            reservation=reservation,
            status=EnumNotificationStatus.FAILURE,
            updated_at=end
        )

        start_str = start.strftime('%Y-%m-%d %H:%M:%S')
        end_str = end.strftime('%Y-%m-%d %H:%M:%S')

        # When
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            # pylint: disable=C0301
            f'/api/notification/metrics/?start={start_str}&end={end_str}&interval=hour&projectId={project.id}&type={EnumNotificationType.SLACK}'
        )

        # Then
        self.assertEqual(response.status_code, 200)

    def test_list(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            '/api/notification/'
        )
        self.assertEqual(response.status_code, 200)

    def test_list_query_string(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            '/api/notification/?type=SLACK&status=PENDING'
        )
        self.assertEqual(response.status_code, 200)

    def test_stat(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(
            '/api/notification/stat/'
        )
        self.assertEqual(response.status_code, 200)


class ReservationAPITestCase(APITestCase):

    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)
    def test_list(self):
        notification_config = baker.make(NotificationConfig)

        self.client.force_authenticate(user=self.user)
        self.client.get(f'/api/notification_config/{notification_config.id}/reservation/')

class NotificationConfigAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)
        cls.rrule = 'FREQ=WEEKLY;COUNT=30;INTERVAL=1;WKST=MO'

    def test_create_reservation(self):
        message = baker.make(NMessage)
        project = baker.make(Project)

        self.client.force_authenticate(user=self.user)
        self.client.post(
            '/api/notification_config/',
            data={
                'message': message.id,
                'target_users': [1],
                'project': project.id,
                'type': EnumNotificationType.EMAIL,
                'rrule': self.rrule,
                'mode': EnumNotificationMode.RESERVATION
            }
        )

    def test_create_immediate(self):
        message = baker.make(NMessage)
        project = baker.make(Project)

        self.client.force_authenticate(user=self.user)
        self.client.post(
            '/api/notification_config/',
            data={
                'message': message.id,
                'target_users': [1],
                'project': project.id,
                'type': EnumNotificationType.EMAIL,
                'mode': EnumNotificationMode.IMMEDIATE,
            }
        )

    def test_create_immediate_email_token_not_expired(self):
        message = baker.make(NMessage)
        self.user.token = {
            'expires_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
        }
        project = baker.make(Project, user=self.user)

        self.client.force_authenticate(user=self.user)
        self.client.post(
            '/api/notification_config/',
            data={
                'message': message.id,
                'target_users': [1],
                'project': project.id,
                'type': EnumNotificationType.EMAIL,
                'mode': EnumNotificationMode.IMMEDIATE,
            }
        )

    def test_create_immediate_email_token_expired(self):
        message = baker.make(NMessage)
        self.user.token = {
            'expires_at': (datetime.now() - timedelta(hours=3)).strftime('%Y-%m-%d %H:%M:%S')
        }
        project = baker.make(Project, user=self.user)

        self.client.force_authenticate(user=self.user)
        self.client.post(
            '/api/notification_config/',
            data={
                'message': message.id,
                'target_users': [1],
                'project': project.id,
                'type': EnumNotificationType.EMAIL,
                'mode': EnumNotificationMode.IMMEDIATE,
            }
        )

    def test_create_immediate_email_token_invalid(self):
        message = baker.make(NMessage)
        self.user.token = {}
        project = baker.make(Project, user=self.user)

        self.client.force_authenticate(user=self.user)
        self.client.post(
            '/api/notification_config/',
            data={
                'message': message.id,
                'target_users': [1],
                'project': project.id,
                'type': EnumNotificationType.EMAIL,
                'mode': EnumNotificationMode.IMMEDIATE,
            }
        )

class TaskSendApiNotificationTest(TestCase):

    @mock.patch('requests.post', return_value=mock.Mock(status_code=200, text=''))
    def test_task_send_api_notification(self, _):
        # pylint: disable=R0801
        target_user = baker.make(
            TargetUser, notification_type=EnumNotificationType.SLACK
        )
        notification = baker.make(
            Notification,
            target_user=target_user
        )
        notification = {
            'id': notification.id,
            'endpoint': 'http://localhost:8000/api/message/',
            'headers': {
                'Content-Type': 'application/json',
            },
            'data': '{"project": 1, "content": "test"}',
        }

        response = task_send_api_notification(notification)

        self.assertEqual(response, None)

    @mock.patch('requests.post', return_value=mock.Mock(status_code=400, text=''))
    def test_task_send_api_notification_fail(self, _):
        # Given
        target_user = baker.make(
            TargetUser, notification_type=EnumNotificationType.SLACK
        )
        notification = baker.make(
            Notification,
            target_user=target_user
        )
        notification = {
            'id': notification.id,
            'endpoint': 'http://localhost:8000/api/message/',
            'headers': {
                'Content-Type': 'application/json',
            },
            'data': '{"project": 1, "content": "test"}',
        }

        response = task_send_api_notification(notification)

        self.assertEqual(response, None)


class TaskSendSlackNotificationTest(TestCase):

    @mock.patch('requests.post', return_value=mock.Mock(
        status_code=200, json=lambda: {'ok': True}))
    def test_task_send_slack_notification(self, _):
        target_user = baker.make(
            TargetUser, notification_type=EnumNotificationType.SLACK
        )
        notification = baker.make(
            Notification,
            target_user=target_user
        )
        notification_data = {
            'id': notification.id,
            'text': 'text',
            'channel': 'channel',
            'api_key': 'api_key'
        }

        task_send_slack_notification(notification_data)
        notification.refresh_from_db()
        self.assertEqual(notification.status, EnumNotificationStatus.SUCCESS)
        self.assertEqual(notification.status, EnumNotificationStatus.SUCCESS)

    @mock.patch('requests.post', return_value=mock.Mock(
        status_code=200, json=lambda: {'ok': False}))
    def test_task_send_slack_notification_when_not_ok(self, _):
        target_user = baker.make(
            TargetUser, notification_type=EnumNotificationType.SLACK
        )
        notification = baker.make(
            Notification,
            target_user=target_user
        )
        notification_data = {
            'id': notification.id,
            'text': 'text',
            'channel': 'channel',
            'api_key': 'api_key'
        }

        task_send_slack_notification(notification_data)
        notification.refresh_from_db()
        self.assertEqual(notification.status, EnumNotificationStatus.FAILURE)


class TaskHandleReservationTestCase(TestCase):
    @mock.patch('notifications.services.task_handle_chunk_notification.delay')
    def test_task_spawn_notification_by_chunk(self, mocked_task_spawn_notification_by_chunk):
        # Given
        notification_config = baker.make(NotificationConfig)
        reservation = baker.make(Reservation, notification_config=notification_config)
        baker.make(
            Notification,
            reservation=reservation,
            _quantity=150
        )

        # When
        task_spawn_notification_by_chunk(reservation.id)

        # Then
        calls = [
            call(list(range(1, 100 + 1))),
            call(list(range(101, 150 + 1))),
        ]
        mocked_task_spawn_notification_by_chunk.assert_has_calls(calls)


class TaskHandleChunkNotificationTestCase(TestCase):
    @mock.patch('notifications.services.task_send_api_notification.delay')
    def test_task_handle_chunk_notification(self, mocked_task_send_api_notification):
        for nt in EnumNotificationType:
            # Given
            target_user = baker.make(TargetUser, notification_type=nt, data={'api_key': ''})
            nmessage = baker.make(NMessage, notification_type=nt,
                                  data={'message': '', 'channel': '', 'api_key': ''})
            notification_config = baker.make(NotificationConfig, type=nt, nmessage=nmessage)
            reservation = baker.make(Reservation, notification_config=notification_config)
            notifications = baker.make(
                Notification,
                reservation=reservation,
                target_user=target_user,
                status=EnumNotificationStatus.PENDING,
                _quantity=2,
            )

            # When
            task_handle_chunk_notification([notification.id for notification in notifications])

            # Then
            self.assertEqual(mocked_task_send_api_notification.call_count, 2)

    @mock.patch('notifications.services.task_send_slack_notification.delay')
    def test_task_handle_chunk_slack_notification(self, mocked_task_send_slack_notification):
        target_user = baker.make(TargetUser, notification_type=EnumNotificationType.SLACK,
                                 data={'api_key': 'key'})
        nmessage = baker.make(NMessage, notification_type=EnumNotificationType.SLACK,
                              data={'message': 'm', 'channel': 'ch'})
        notification_config = baker.make(NotificationConfig, type=EnumNotificationType.SLACK,
                                         nmessage=nmessage)
        reservation = baker.make(Reservation, notification_config=notification_config)
        notifications = baker.make(
            Notification,
            reservation=reservation,
            target_user=target_user,
            status=EnumNotificationStatus.PENDING,
            _quantity=2,
        )

        task_handle_chunk_notification([notification.id for notification in notifications])

        self.assertEqual(mocked_task_send_slack_notification.call_count, 2)


class CronTaskHandleReservationTestCase(TestCase):

    @mock.patch('notifications.services.task_spawn_notification_by_chunk.delay')
    def test_cron_handle_reservation(self, mocked_task_spawn_notification_by_chunk):
        # Given
        baker.make(Reservation, status=EnumReservationStatus.PENDING)

        # When
        cron_task_handle_reservation()

        # Then
        mocked_task_spawn_notification_by_chunk.assert_called_once()


class TaskBulkCreateNotification(TestCase):
    def test_create_notification(self):
        # Given
        notification_config = baker.make(NotificationConfig)
        target_users = baker.make(TargetUser, _quantity=2)

        # When
        reserved_at = timezone.now()
        target_user_ids = [target_user.id for target_user in target_users]
        task_bulk_create_notification(reserved_at, target_user_ids, notification_config.id,
                                      EnumNotificationMode.RESERVATION)

        # Then
        self.assertTrue(Reservation.objects.exists())
        self.assertEqual(Notification.objects.count(), 2)


class TaskSendSmsNotification(TestCase):
    @mock.patch('requests.post', return_value=mock.Mock(status_code=200, text=''))
    def test_service_sms_success(self, _):
        notification = baker.make(Notification)

        notification_data = {
            "endpoint": "endpoint",
            "data": "content",
            "id": notification.id,
        }
        task_send_sms_notification(notification_data)

    @mock.patch('requests.post', return_value=mock.Mock(status_code=400, text=''))
    def test_service_sms(self, _):
        notification = baker.make(Notification)

        notification_data = {
            "endpoint": "endpoint",
            "data": "content",
            "id": notification.id,
        }
        task_send_sms_notification(notification_data)
