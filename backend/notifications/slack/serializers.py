from rest_framework import serializers

from notifications.models import Notification


class SlackNotificationSerializer(serializers.ModelSerializer):
    text = serializers.SerializerMethodField()
    channel = serializers.SerializerMethodField()
    api_key = serializers.SerializerMethodField()

    class Meta:
        model = Notification
        fields = ('id', 'text', 'channel', 'api_key')

    def get_text(self, obj):
        return obj.reservation.notification_config.nmessage.data['message']

    def get_channel(self, obj):
        return obj.reservation.notification_config.nmessage.data['channel']

    def get_api_key(self, obj):
        return obj.target_user.data['api_key']
