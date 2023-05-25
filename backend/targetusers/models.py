from django.db import models

from account.models import User
from core.models import TimeStampedModel
from notifications.models import EnumNotificationType


class TargetUser(TimeStampedModel):
    """Model definition for TargetUser."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=32)
    notification_type = models.CharField(max_length=32, choices=EnumNotificationType.choices)
    endpoint = models.CharField(max_length=255, blank=True)
    data = models.JSONField()
