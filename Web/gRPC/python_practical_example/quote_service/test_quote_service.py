import time
from unittest import TestCase
from unittest.mock import Mock

import grpc_testing
from google.protobuf.empty_pb2 import Empty
from grpc import StatusCode

from quote_pb2 import SecretKeyResponse, DESCRIPTOR as QUOTE_DESCRIPTOR, RandomQuoteRequest, RandomQuoteResponse
from quote_service import QuoteService

target_service = QUOTE_DESCRIPTOR.services_by_name['Quote']


# noinspection PyUnusedLocal
class TestQuoteService(TestCase):
    def setUp(self):
        self._real_time = grpc_testing.strict_real_time()
        self._fake_time = grpc_testing.strict_fake_time(time.time())
        self.mock_cowsay_client = Mock()
        # noinspection PyTypeChecker
        service = QuoteService(self.mock_cowsay_client, 'key')
        descriptors_to_services = {
            target_service: service
        }
        self._real_time_server = grpc_testing.server_from_dictionary(
            descriptors_to_services, self._real_time)
        self._fake_time_server = grpc_testing.server_from_dictionary(
            descriptors_to_services, self._fake_time)

    def test_GetRandomQuote_without_additional(self):
        self.mock_cowsay_client.get_quote = lambda _, m: f"!{m}!"

        request = RandomQuoteRequest(message='foo')

        rpc = self._real_time_server.invoke_unary_unary(target_service.methods_by_name['GetRandomQuote'], [], request,
                                                        None)  # [] means no metadata

        initial_metadata = rpc.initial_metadata()
        response, trailing_metadata, code, details = rpc.termination()

        self.assertEqual(RandomQuoteResponse(output='!foo!'), response)
        self.assertIs(StatusCode.OK, code)
        self.assertIn(('initial-success', 'foo'), initial_metadata)
        self.assertIn(('trailing-success', 'bar'), trailing_metadata)

    def test_GetRandomQuote_with_additional(self):
        self.mock_cowsay_client.get_quote = lambda _, m: f"!{m}!"

        request = RandomQuoteRequest(message='foo')

        rpc = self._real_time_server.invoke_unary_unary(target_service.methods_by_name['GetRandomQuote'],
                                                        [('additional', 'a')], request, None)

        initial_metadata = rpc.initial_metadata()
        response, trailing_metadata, code, details = rpc.termination()

        self.assertEqual(RandomQuoteResponse(output='!foo with a!'), response)
        self.assertIs(StatusCode.OK, code)
        self.assertIn(('initial-success', 'foo'), initial_metadata)
        self.assertIn(('trailing-success', 'bar'), trailing_metadata)

    def test_GetSecretKey(self):
        request = Empty()

        rpc = self._real_time_server.invoke_unary_unary(target_service.methods_by_name['GetSecretKey'], [], request,
                                                        None)

        initial_metadata = rpc.initial_metadata()
        response, trailing_metadata, code, details = rpc.termination()

        self.assertEqual(SecretKeyResponse(key='key'), response)
        self.assertIs(StatusCode.OK, code)
