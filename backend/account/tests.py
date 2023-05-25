from unittest import mock

from django.urls import reverse
from model_bakery import baker
from rest_framework import status
from rest_framework.test import APITestCase

from account.models import User


class SignUpAPITestCase(APITestCase):

    def test_signup(self):
        url = reverse('signup')
        resp = self.client.post(url, data={
            'email': 'test@test.com',
            'password': '1234',
            'username': 'test'
        })
        self.assertEqual(resp.status_code, status.HTTP_201_CREATED)
        self.assertTrue(User.objects.filter(email='test@test.com').exists())

        resp = self.client.post(url, data={
            'email': 'test@test.com',
            'password': '1234',
            'username': 'test'
        })
        self.assertEqual(resp.status_code, status.HTTP_400_BAD_REQUEST)

    def test_user(self):
        url = reverse('user')
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_401_UNAUTHORIZED)

        user = User.objects.create_user(email='test@test.com', password='test', username='test')
        self.client.force_login(user)
        resp = self.client.get(url)
        self.assertEqual(resp.status_code, status.HTTP_200_OK)
        self.assertEqual(resp.data['username'], user.username)

    def test_has_perm(self):
        # Given
        user = baker.make(User)

        # When, Then
        self.assertTrue(user.has_perm(None, None))

    def test_has_module_perm(self):
        # Given
        user = baker.make(User)

        # When, Then
        self.assertTrue(user.has_module_perms(None))


class GmailViewTestCase(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user('test@test.com', 'test')

    @mock.patch('requests.post', return_value=mock.Mock(status_code=200, json=lambda: {
        'expires_in': 30
    }))
    def test_gmail(self, _):
        self.client.force_login(self.user)
        response = self.client.post('/api/gmail/', data={
            'code': '123',
        })

        self.assertEqual(response.status_code, 302)
