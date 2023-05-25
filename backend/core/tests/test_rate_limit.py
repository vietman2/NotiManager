from random import random
from unittest import TestCase

from core.rate_limit import rate_limit


class RateLimitTestCase(TestCase):

    def test_rate_limit(self):
        cnt = 0
        retry = 0

        class A:
            @rate_limit(1, key=random())
            def f(self, *args, **kwargs):
                nonlocal cnt
                cnt += 1

            def retry(self, *args, **kwargs):
                nonlocal retry
                retry += 1

        a = A()
        a.f()
        a.f()
        self.assertEqual(cnt, 1)
        self.assertEqual(retry, 1)
