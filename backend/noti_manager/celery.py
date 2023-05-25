import os

from celery import Celery

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'noti_manager.settings')

app = Celery('noti_manager')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.autodiscover_tasks()
