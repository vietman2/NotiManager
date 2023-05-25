from rest_framework import status
from rest_framework.response import Response

from notifications.models import EnumNotificationType


# pylint: disable=too-few-public-methods
class CreateByNotificationTypeMixin:
    def create(self, request, *args, **kwargs):
        if not ('notification_type' in request.data and
                request.data['notification_type'] in EnumNotificationType):
            return Response('Invalid Notification Type', status=status.HTTP_400_BAD_REQUEST)
        serializer_class = self.get_create_serializer_class()
        serializer = serializer_class(
            data=request.data,
            context=self.get_serializer_context()
        )
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
