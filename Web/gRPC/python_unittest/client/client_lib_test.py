import time
import unittest

import grpc
from grpc.framework.foundation import logging_pool

import calculator_pb2
import grpc_testing
from calculator_pb2 import CalculationRequest, CalculationResponse
from client.client_lib import Connector

target_service = calculator_pb2.DESCRIPTOR.services_by_name['Calculator']


class CalculatorClientTest(unittest.TestCase):
    def setUp(self):
        self._client_execution_thread_pool = logging_pool.pool(1)

        self._fake_time = grpc_testing.strict_fake_time(time.time())
        self._real_time = grpc_testing.strict_real_time()
        self._fake_time_channel = grpc_testing.channel(
            calculator_pb2.DESCRIPTOR.services_by_name.values(), self._fake_time)
        self._real_time_channel = grpc_testing.channel(
            calculator_pb2.DESCRIPTOR.services_by_name.values(), self._real_time)

    def tearDown(self):
        self._client_execution_thread_pool.shutdown(wait=False)

    def test_successful_square(self):
        arguments = 2

        def run(scenario, channel):
            connector = Connector(channel)
            return connector.square(scenario)  # test target

        application_future = self._client_execution_thread_pool.submit(
            run, arguments, self._real_time_channel)
        invocation_metadata, actual_request, rpc = (
            self._real_time_channel.take_unary_unary(
                target_service.methods_by_name['Square']))

        expected_request = CalculationRequest(value=2)

        self.assertEqual(expected_request, actual_request)

        rpc.terminate(CalculationResponse(value=4), (),
                      grpc.StatusCode.OK, '')

        actual_result = application_future.result()
        expected_result = 4

        self.assertEqual(expected_result, actual_result)

    def test_successful_natural_numbers_lq(self):
        arguments = 2

        def run(scenario, channel):
            connector = Connector(channel)
            return connector.natural_numbers_lq(scenario)

        application_future = self._client_execution_thread_pool.submit(
            run, arguments, self._fake_time_channel)
        invocation_metadata, actual_request, rpc = (
            self._fake_time_channel.take_unary_stream(
                target_service.methods_by_name['NaturalNumberGenerator']))

        expected_request = CalculationRequest(value=2)

        self.assertEqual(expected_request, actual_request)

        rpc.send_response(CalculationResponse(value=1))
        rpc.send_response(CalculationResponse(value=2))

        rpc.terminate((), grpc.StatusCode.OK, '')

        actual_result = application_future.result()
        expected_result = [1, 2]

        self.assertListEqual(expected_result, actual_result)

    def test_successful_summation(self):
        arguments = [2, 3]

        def run(scenario, channel):
            connector = Connector(channel)
            return connector.summation(scenario)

        application_future = self._client_execution_thread_pool.submit(
            run, arguments, self._real_time_channel)
        invocation_metadata, rpc = self._real_time_channel.take_stream_unary(
            target_service.methods_by_name['Summation'])

        actual_request1 = rpc.take_request()
        actual_request2 = rpc.take_request()
        actual_requests = [actual_request1, actual_request2]
        expected_requests = [CalculationRequest(value=2), CalculationRequest(value=3)]

        self.assertListEqual(expected_requests, actual_requests)

        rpc.requests_closed()
        rpc.terminate(CalculationResponse(value=5), (), grpc.StatusCode.OK, '')

        actual_result = application_future.result()
        expected_result = 5

        self.assertEqual(expected_result, actual_result)

    def test_successful_buffer3_sum(self):
        arguments = [1, 2, 3, 4, 5, 6, 7, 8]

        def run(scenario, channel):
            connector = Connector(channel)
            return connector.buffer3_sum(scenario)

        application_future = self._client_execution_thread_pool.submit(
            run, arguments, self._fake_time_channel)
        invocation_metadata, rpc = self._fake_time_channel.take_stream_stream(
            target_service.methods_by_name['Buffer3Sum'])

        actual_request1 = rpc.take_request()
        actual_request2 = rpc.take_request()
        actual_request3 = rpc.take_request()
        actual_requests = [actual_request1, actual_request2, actual_request3]
        expected_requests = [CalculationRequest(value=1),
                             CalculationRequest(value=2),
                             CalculationRequest(value=3)]

        self.assertListEqual(expected_requests, actual_requests)

        rpc.send_response(CalculationResponse(value=6))

        actual_request1 = rpc.take_request()
        actual_request2 = rpc.take_request()
        actual_request3 = rpc.take_request()
        actual_requests = [actual_request1, actual_request2, actual_request3]
        expected_requests = [CalculationRequest(value=4),
                             CalculationRequest(value=5),
                             CalculationRequest(value=6)]

        self.assertListEqual(expected_requests, actual_requests)

        rpc.send_response(CalculationResponse(value=15))

        actual_request1 = rpc.take_request()
        actual_request2 = rpc.take_request()
        actual_requests = [actual_request1, actual_request2]
        expected_requests = [CalculationRequest(value=7),
                             CalculationRequest(value=8)]

        self.assertListEqual(expected_requests, actual_requests)

        rpc.requests_closed()
        rpc.send_response(CalculationResponse(value=15))
        rpc.terminate((), grpc.StatusCode.OK, '')

        actual_result = application_future.result()
        expected_result = [6, 15, 15]

        self.assertListEqual(expected_result, actual_result)
