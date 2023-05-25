from django.db import models

from account.models import User
from core.models import TimeStampedModel
from notifications.models import EnumNotificationType


class NMessage(TimeStampedModel):
    """Model definition for NMessages."""
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True)  # TODO shouldn't be nullable
    notification_type = models.CharField(max_length=32, choices=EnumNotificationType.choices)
    data = models.JSONField()
