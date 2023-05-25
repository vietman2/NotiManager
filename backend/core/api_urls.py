from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework.routers import DefaultRouter

from account.views import SignUpView, UserView, GmailView
from nmessages.views import NMessageViewSet
from notifications.views import NotificationConfigViewSet, ReservationViewSet, NotificationViewSet
from project.views import ProjectViewSet
from targetusers.views import TargetUserViewSet

urlpatterns = [
    path('signin/', obtain_auth_token, name='signin'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('user/', UserView.as_view(), name='user'),
    path('gmail/', GmailView.as_view(), name='gmail'),
]

# ViewSet
router = DefaultRouter()
# project app
router.register(r'project', ProjectViewSet, basename='project')
# target user app
router.register(r'targetuser', TargetUserViewSet, basename='targetuser')
# message app
router.register(r'message', NMessageViewSet, basename='nmessage')
# notification app
router.register(r'notification_config', NotificationConfigViewSet, basename='notification_config')
router.register(r'notification', NotificationViewSet, basename='notification')
router.register(
    # pylint: disable=W1401
    'notification_config/(?P<notification_config_id>\d+)/reservation',
    ReservationViewSet,
    basename='reservation'
)

urlpatterns += router.urls
