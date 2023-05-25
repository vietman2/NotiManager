from django.db import models

from account.models import User
from core.models import TimeStampedModel


class ProjectTypeChoices(models.TextChoices):
    ORGANIZATION = 'ORGANIZATION'
    INDIVIDUAL = 'INDIVIDUAL'


class Project(TimeStampedModel):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    project_type = models.CharField(max_length=20, choices=ProjectTypeChoices.choices)
    data = models.JSONField(blank=True, null=True)
