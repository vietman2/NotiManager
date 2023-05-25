import datetime

import pytz
from django.db.models import Count, F, Q
from django.db.models.functions import Trunc
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, GenericViewSet

from core.paginator import CustomPageNumberPagination
from notifications.models import NotificationConfig, Notification, EnumNotificationStatus
from notifications.models import Reservation
from notifications.serializers import (
    NotificationConfigCreateSerializer,
    ReservationSerializer,
    NotificationConfigSerializer, NotificationSerializer, NotificationListSerializer,
)
from project.models import Project


class NotificationConfigViewSet(ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = NotificationConfigSerializer
    queryset = NotificationConfig.objects.all()

    def create(self, request, *args, **kwargs):
        serializers = NotificationConfigCreateSerializer(data=request.data)
        serializers.is_valid(raise_exception=True)
        serializers.save()

        return Response(
            # data=serializers.data,
            status=status.HTTP_201_CREATED
        )


class NotificationViewSet(ListModelMixin, GenericViewSet):
    queryset = Notification.objects.all()
    serializer_class = NotificationSerializer
    pagination_class = CustomPageNumberPagination
    permission_classes = (IsAuthenticated,)

    def get_serializer_class(self):
        return NotificationListSerializer

    def get_queryset(self):
        noti_type = self.request.query_params.get('type')
        noti_status = self.request.query_params.get('status')

        q = Q()
        q &= Q(reservation__notification_config__project__user=self.request.user)
        ##if projectId:
        ##    q &= Q(reservation__notification_config__project__id=projectId)
        if noti_type:
            q &= Q(reservation__notification_config__type=noti_type)
        ##if target:
        ##    q &= Q(reservation__notification_config__target=target)
        if noti_status:
            q &= Q(status=noti_status)

        return self.queryset.filter(q)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def stat(self, request):
        tz = pytz.timezone('Asia/Seoul')
        today = timezone.now().astimezone(tz).replace(hour=0, minute=0, second=0, microsecond=0)
        most_recent_failure = Notification.objects.filter(
            reservation__reserved_at__range=[today, today + timezone.timedelta(days=1)],
            status=EnumNotificationStatus.FAILURE,
        ).order_by('-created_at').first()
        most_request_project = Reservation.objects.filter(
            reserved_at__range=[today, today + timezone.timedelta(days=1)]
        ).annotate(project=F('notification_config__project_id')
                   ).values('project').annotate(
            count=Count('notification')
        ).order_by('-count').first()
        most_used_notification = Reservation.objects.filter(
            reserved_at__range=[today, today + timezone.timedelta(days=1)]
        ).annotate(
            count=Count('notification')
        ).order_by('-count').first()
        data = {
            'most_used_channel': most_used_notification.notification_config.type if
            most_used_notification else None,
            'most_recent_failure': most_recent_failure.reservation.notification_config.nmessage.name
            if most_recent_failure else None,
            'most_request_project': Project.objects.get(pk=most_request_project['project']).name
            if most_request_project else None
        }
        return Response(data)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def metrics(self, request):
        def convert(metric):
            result = {
                'status': metric['status'],
                'time': datetime.datetime.strftime(metric['time'], '%Y-%m-%d %H:%M:%S'),
                'count': metric['count'],
                'project': metric['project'],
                'type': metric['type']
            }
            return result

        start_time = request.query_params.get('start')
        end_time = request.query_params.get('end')

        interval = request.query_params.get('interval')

        projectId = request.query_params.get('projectId')
        noti_type = request.query_params.get('type')

        q = Q()
        q &= Q(reservation__notification_config__project__user=request.user)
        q &= Q(updated_at__range=(start_time, end_time))
        if projectId:
            q &= Q(reservation__notification_config__project_id=projectId)
        if noti_type:
            q &= Q(reservation__notification_config__type=noti_type)

        metrics = Notification.objects.select_related('reservation__notification_config').filter(
            q).annotate(
            time=Trunc('updated_at', interval),
            project=F('reservation__notification_config__project_id'),
            type=F('reservation__notification_config__type'),
        ).values('status', 'time', 'project', 'type').annotate(
            count=Count('time')
        ).order_by('time', 'status', 'count', 'project', 'type')

        response = list(map(convert, metrics))

        return Response(data=response, status=status.HTTP_200_OK)


class ReservationViewSet(ModelViewSet):
    queryset = Reservation.objects.all()
    serializer_class = ReservationSerializer

    # pylint: disable=W0221
    def list(self, request, notification_config_id):
        queryset = self.filter_queryset(self.get_queryset().filter(
            notification_config_id=notification_config_id
        ))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
