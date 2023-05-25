from functools import wraps

import redis
from celery.utils.log import task_logger
from django.conf import settings
from limitlion import throttle_configure, throttle

redis = redis.Redis(settings.REDIS_HOST, 6379)
throttle_configure(redis)


def rate_limit(maximum_allowed_per_minute, key=None):
    def _rate_limit(func):
        nonlocal key
        if key is None:
            key = func.__name__

        # pylint: disable=R1710
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            allowed, _, sleep = throttle(key, rps=maximum_allowed_per_minute / 60, window=60)
            if not allowed:
                task_logger.info("rate limit exceeded")
                self.retry(countdown=sleep)
                return
            return func(self, *args, **kwargs)

        return wrapper

    return _rate_limit
