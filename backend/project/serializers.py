from rest_framework import serializers

from notifications.models import Notification, EnumNotificationStatus
from project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    number_of_requests = serializers.SerializerMethodField()
    most_recently_sent_notification = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = ('id', 'project_type', 'name', 'user', 'number_of_requests',
                  'most_recently_sent_notification')

    def get_number_of_requests(self, obj: Project):
        return Notification.objects.filter(
            reservation__notification_config__project=obj
        ).exclude(
            status=EnumNotificationStatus.PENDING,
        ).count()

    def get_most_recently_sent_notification(self, obj: Project):
        recent_noti = Notification.objects.filter(
            reservation__notification_config__project=obj,
            status=EnumNotificationStatus.SUCCESS
        ).order_by('-created_at').first()
        if recent_noti:
            return recent_noti.reservation.notification_config.nmessage.name

        return ''
