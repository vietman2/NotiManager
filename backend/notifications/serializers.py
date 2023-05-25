from datetime import datetime, timedelta

from dateutil.rrule import rrulestr
from django.conf import settings
from django.utils import timezone
from rest_framework import serializers

from notifications.models import (
    NotificationConfig,
    Reservation,
    EnumNotificationMode,
    Notification,
    EnumNotificationType,
)
from notifications.services import task_bulk_create_notification


class NotificationConfigSerializer(serializers.ModelSerializer):
    message = serializers.CharField(source='nmessage_id')

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type', 'rrule',)


class NotificationConfigCreateSerializer(serializers.ModelSerializer):
    message = serializers.IntegerField(source='nmessage_id')
    target_users = serializers.ListField(child=serializers.IntegerField())

    class Meta:
        model = NotificationConfig
        fields = ('id', 'message', 'project', 'type', 'rrule', 'target_users', 'mode',)
        extra_kwargs = {
            'target_users': {'write_only': True, },
        }

    def create(self, validated_data):
        target_users: list[int] = validated_data.pop('target_users')

        notification_config = super().create(validated_data)

        reservation_time = []
        if notification_config.mode == EnumNotificationMode.RESERVATION:
            rrule = validated_data.get('rrule')
            reservation_time += rrulestr(rrule)[:settings.MAX_RESERVATION_COUNT]
            if notification_config.type == EnumNotificationType.EMAIL:
                last_reservation_time = datetime.now() + timedelta(minutes=59)
                reservation_time = [reservation for reservation in reservation_time if
                                    reservation < last_reservation_time]
        elif notification_config.mode == EnumNotificationMode.IMMEDIATE:
            reservation_time += [timezone.now()]
            if notification_config.type == EnumNotificationType.EMAIL:
                token = notification_config.project.user.token
                if token is None:
                    raise serializers.ValidationError('token is required')
                if expires_at := token.get('expires_at'):
                    # pylint: disable=C0301
                    threshold = datetime.strptime(expires_at, '%Y-%m-%d %H:%M:%S') + timedelta(minutes=1)
                    if threshold < datetime.now():
                        raise serializers.ValidationError('token is expired')

        for time in reservation_time:
            task_bulk_create_notification.delay(
                time,
                target_users,
                notification_config.id,
                notification_config.mode
            )

        return notification_config


class ReservationSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Reservation
        fields = ('id', 'reserved_at', )


class NotificationSerializer(serializers.ModelSerializer):
    target = serializers.CharField(source='target_user')
    type = serializers.CharField(source='reservation__notification_config__type')

    class Meta:
        model = Notification
        fields = ('id', 'reservation', 'target', 'status', 'request', 'response',
                  'type')


class NotificationListSerializer(serializers.ModelSerializer):
    target = serializers.CharField(source='target_user.name')
    project = serializers.CharField(source='reservation.notification_config.project.name')
    type = serializers.CharField(source='reservation.notification_config.type')
    reserved_at = serializers.CharField(source='reservation.reserved_at')

    class Meta:
        model = Notification
        fields = ('id', 'project', 'target', 'status', 'created_at', 'elapsed_time', 'status_code',
                  'type', 'started_at', 'reserved_at')
