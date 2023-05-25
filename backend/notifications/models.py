from django.db import models

from core.models import TimeStampedModel


class EnumReservationStatus(models.TextChoices):
    PENDING = 'PENDING'
    SENDING = 'SENDING'
    SUCCESS = 'SUCCESS'
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
    FAILURE = 'FAILURE'


class EnumNotificationStatus(models.TextChoices):
    PENDING = 'PENDING'
    SENDING = 'SENDING'
    SUCCESS = 'SUCCESS'
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS'
    FAILURE = 'FAILURE'


class EnumNotificationType(models.TextChoices):
    WEBHOOK = 'WEBHOOK'
    SLACK = 'SLACK'
    EMAIL = 'EMAIL'
    SMS = 'SMS'


class EnumNotificationMode(models.TextChoices):
    IMMEDIATE = 'IMMEDIATE'
    RESERVATION = 'RESERVATION'


class NotificationConfig(TimeStampedModel):
    project = models.ForeignKey('project.Project', on_delete=models.CASCADE)
    nmessage = models.ForeignKey('nmessages.NMessage', on_delete=models.CASCADE)
    type = models.CharField(max_length=20, choices=EnumNotificationType.choices)
    mode = models.CharField(
        max_length=20,
        choices=EnumNotificationMode.choices,
        default=EnumNotificationMode.RESERVATION
    )
    rrule = models.TextField(null=True)


class Notification(TimeStampedModel):
    reservation = models.ForeignKey(
        'Reservation',
        on_delete=models.CASCADE,
        null=True  # should not be nullable
    )
    target_user = models.ForeignKey('targetusers.TargetUser', on_delete=models.CASCADE)
    status = models.CharField(
        max_length=20,
        choices=EnumNotificationStatus.choices,
        default=EnumNotificationStatus.PENDING
    )
    request = models.JSONField(null=True)
    response = models.JSONField(null=True)
    started_at = models.DateTimeField(null=True)
    finished_at = models.DateTimeField(null=True)

    # pylint: disable=R0913
    def update_result(self, status, response_status, response_data, started_at, finished_at):
        self.status = status
        self.response = {
            'response': response_data,
            'status_code': response_status,
        }
        self.started_at = started_at
        self.finished_at = finished_at
        self.save(update_fields=['status', 'response', 'updated_at', 'started_at', 'finished_at'])

    @property
    def elapsed_time(self):
        if self.finished_at:
            elapsed = self.finished_at - self.started_at
            return elapsed.total_seconds()

        return None

    @property
    def status_code(self):
        if self.response and 'status_code' in self.response:
            return self.response['status_code']

        return None

class Reservation(TimeStampedModel):
    notification_config = models.ForeignKey(
        'notifications.NotificationConfig',
        on_delete=models.CASCADE
    )
    status = models.CharField(max_length=20, choices=EnumReservationStatus.choices)
    reserved_at = models.DateTimeField()
