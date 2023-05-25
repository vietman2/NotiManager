import os

from noti_manager.settings.base import *  # pylint: disable=W0401,W0614

DEBUG = True

ALLOWED_HOSTS = ['*']

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'noti_manager',
        'USER': os.environ['DB_USER'],
        'PASSWORD': os.environ['DB_PASSWORD'],
        'HOST': 'noti-manager.cgt0l9cbagk3.ap-northeast-2.rds.amazonaws.com',
    }
}

CORS_ALLOW_ALL_ORIGINS = True
CORS_ALLOW_CREDENTIALS = False

CORS_ALLOW_HEADERS = ['*']

# CELERY
CELERY_BROKER_URL = 'redis://noti-manager.wwlvtt.ng.0001.apn2.cache.amazonaws.com:6379'
CELERY_RESULT_BACKEND = 'redis://noti-manager.wwlvtt.ng.0001.apn2.cache.amazonaws.com:6379'

REDIS_HOST = 'noti-manager.wwlvtt.ng.0001.apn2.cache.amazonaws.com'

SMS_SENDER = os.environ.get('SMS_SENDER')
NCLOUD_ACCESS_KEY = os.environ.get('NCLOUD_ACCESS_KEY')
NCLOUD_SECRET_KEY = os.environ.get('NCLOUD_SECRET_KEY')
NCLOUD_SERVICE_ID = os.environ.get('NCLOUD_SECRET_KEY')
NCLOUD_SMS_ENDPOINT = os.environ.get('NCLOUD_SMS_ENDPOINT')
