from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from core.views import CreateByNotificationTypeMixin
from targetusers.models import TargetUser
from targetusers.serializers import TargetUserSerializer


class TargetUserViewSet(CreateByNotificationTypeMixin, ModelViewSet):
    queryset = TargetUser.objects.all()
    serializer_class = TargetUserSerializer
    permission_classes = (IsAuthenticated,)

    # pylint: disable=inconsistent-return-statements
    def get_create_serializer_class(self):
        return TargetUserSerializer

    def get_queryset(self):
        return self.queryset.filter(user=self.request.user)
