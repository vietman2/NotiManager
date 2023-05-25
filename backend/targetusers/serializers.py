from rest_framework import serializers

from notifications.models import EnumNotificationType
from targetusers.models import TargetUser


class TargetUserSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = TargetUser
        fields = ('id', 'user', 'name', 'data', 'endpoint', 'notification_type',)

    def validate(self, attrs):
        notification_type = attrs.get('notification_type')
        data = attrs['data']

        if notification_type == EnumNotificationType.SLACK:
            if 'api_key' not in data:
                raise serializers.ValidationError('No API key provided')
        # pylint: disable=R1720
        elif notification_type == EnumNotificationType.WEBHOOK:
            if 'auth' not in data:
                raise serializers.ValidationError('No auth provided')

            auth = data['auth']
            if auth == 'bearer' and 'token' not in data:
                raise serializers.ValidationError('No token provided')
            elif auth == 'basic' and ('username' not in data or 'password' not in data):
                raise serializers.ValidationError('No username or password provided')
            elif auth == 'api_key' and ('key' not in data or 'value' not in data):
                raise serializers.ValidationError('No key or value provided')

        return super().validate(attrs)
