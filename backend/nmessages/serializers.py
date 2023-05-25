from rest_framework import serializers

from nmessages.models import NMessage
from notifications.models import EnumNotificationType


class NMessageSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = NMessage
        fields = ('id', 'user', 'name', 'notification_type', 'data',)

    def validate(self, attrs):
        notification_type = attrs['notification_type']
        data = attrs['data']
        if notification_type == EnumNotificationType.SLACK:
            if not ('channel' in data and 'message' in data):
                raise serializers.ValidationError('No channel or content provided')
        elif notification_type == EnumNotificationType.SMS:
            pass
        elif notification_type == EnumNotificationType.EMAIL:
            pass
        elif notification_type == EnumNotificationType.WEBHOOK:
            pass

        return attrs
