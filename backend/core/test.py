from unittest.mock import Mock

from django.test import TestCase
from model_bakery import baker

from account.models import User
from core.permissions import IsOwner


class IsOwnerTestCase(TestCase):
    def test_is_owner(self):
        # Given
        user = baker.make(User)

        request = Mock()
        request.user = user

        obj = Mock()
        obj.user = user

        self.assertTrue(IsOwner().has_object_permission(request, None, obj))


class UserManagerTestCase(TestCase):
    def test_create_superuser(self):
        # Given
        email = "admin@admin.com"
        username = "admin"
        password = "admin"

        # When, Then
        user = User.objects.create_superuser(email, username, password)
        self.assertTrue(user.is_staff)
