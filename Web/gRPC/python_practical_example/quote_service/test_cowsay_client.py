import time
from unittest import TestCase

import grpc_testing
from grpc import StatusCode
from grpc.framework.foundation import logging_pool

from cowsay_client import CowsayClient
from cowsay_pb2 import DESCRIPTOR as COWSAY_DESCRIPTOR, QuoteRequest, QuoteResponse
from cowsay_pb2_grpc import CowsayStub

target_service = COWSAY_DESCRIPTOR.services_by_name['Cowsay']


class TestCowsayClient(TestCase):
    def setUp(self):
        self._client_execution_thread_pool = logging_pool.pool(1)

        self._fake_time = grpc_testing.strict_fake_time(time.time())
        self._real_time = grpc_testing.strict_real_time()
        self._fake_time_channel = grpc_testing.channel(COWSAY_DESCRIPTOR.services_by_name.values(), self._fake_time)
        self._real_time_channel = grpc_testing.channel(COWSAY_DESCRIPTOR.services_by_name.values(), self._real_time)

    def tearDown(self):
        self._client_execution_thread_pool.shutdown(wait=False)

    def test_get_quote(self):
        arguments = ('cow', 'foo')

        def run(scenario, channel):
            stub = CowsayStub(channel)
            client = CowsayClient(stub)
            return client.get_quote(*scenario)

        f = self._client_execution_thread_pool.submit(run, arguments, self._real_time_channel)
        invocation_metadata, request, rpc = self._real_time_channel.take_unary_unary(
            target_service.methods_by_name['GetQuote'])

        self.assertEqual(QuoteRequest(message='foo', animal=QuoteRequest.COW), request)
        self.assertIn(('z', 'y'), invocation_metadata)

        rpc.send_initial_metadata([('abc', 'def')])
        rpc.terminate(QuoteResponse(output='foo2'), [('uvw', 'xyz')], StatusCode.OK, '')

        result = f.result()

        self.assertEqual('foo2', result)
