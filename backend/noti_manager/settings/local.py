from noti_manager.settings.base import *  # pylint: disable=W0401,W0614


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# CORS
CORS_ORIGIN_ALLOW_ALL = True
CORS_ALLOW_CREDENTIALS = True


# CELERY
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


REDIS_HOST = 'localhost'

# SMS
SMS_SENDER =''
NCLOUD_ACCESS_KEY = ''
NCLOUD_SECRET_KEY = ''
NCLOUD_SERVICE_ID = ''
NCLOUD_SMS_ENDPOINT = ''
