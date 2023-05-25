from django.urls import reverse
from model_bakery import baker
from rest_framework import status
from rest_framework.test import APITestCase

from account.models import User
from notifications.models import EnumNotificationType
from targetusers.models import TargetUser


class TargetUserAPITestCase(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user = baker.make(User)

    def test_list(self):
        self.client.force_authenticate(self.user)
        response = self.client.get('/api/targetuser/')
        self.assertEqual(response.status_code, 200)

    def test_create(self):
        self.client.force_login(self.user)
        request_data = {
            'notification_type': EnumNotificationType.SLACK,
            'name': 'name',
            'data': {
                'auth': 'api_key',
                'api_key': 'api-key',
            }
        }
        response = self.client.post(reverse('targetuser-list'), data=request_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TargetUser.objects.last().name, request_data['name'])

        request_data = {
            'notification_type': EnumNotificationType.SLACK,
            'name': 'name',
            'data': {
            }
        }
        self.client.post(reverse('targetuser-list'), data=request_data, format='json')

        request_data = {
            'notification_type': EnumNotificationType.WEBHOOK,
            'name': 'name',
            'data': {
                'auth': 'bearer',
                'token': 'api-key',
            }
        }
        response = self.client.post(reverse('targetuser-list'), data=request_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(TargetUser.objects.last().name, request_data['name'])

    def test_create_webhook(self):
        self.client.force_login(self.user)

        request_data_list = [
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                }
            },
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                    'auth': 'bearer',
                    'token': 'token',
                }
            },
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                    'auth': 'bearer',
                }
            }
            ,
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                    'auth': 'basic',
                    'username': 'username',
                    'password': 'password',
                }
            },
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                    'auth': 'basic',
                }
            },
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                    'auth': 'api_key',
                }
            },
            {
                'notification_type': EnumNotificationType.WEBHOOK,
                'name': 'name',
                'data': {
                    'auth': 'api_key',
                    'key': 'key',
                    'value': 'value',
                }
            },
        ]
        for request_data in request_data_list:
            with self.subTest(msg=request_data):
                self.client.post(reverse('targetuser-list'), data=request_data, format='json')

    def test_invalid_type_create(self):
        self.client.force_login(self.user)
        data = {'notification_type': '.',
                'name': 'name', 'api_key': 'api-key'}
        response = self.client.post(reverse('targetuser-list'), data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
