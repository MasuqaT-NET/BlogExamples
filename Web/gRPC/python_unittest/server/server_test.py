import time
import unittest

import grpc

import calculator_pb2
import grpc_testing
from calculator_pb2 import CalculationRequest, CalculationResponse
from calculator_service import CalculatorService

target_service = calculator_pb2.DESCRIPTOR.services_by_name['Calculator']


class CalculatorServerTest(unittest.TestCase):
    def setUp(self):
        self._real_time = grpc_testing.strict_real_time()
        self._fake_time = grpc_testing.strict_fake_time(time.time())
        servicer = CalculatorService()
        descriptors_to_servicers = {
            # _application_testing_common.FIRST_SERVICE: servicer
            target_service: servicer
        }
        self._real_time_server = grpc_testing.server_from_dictionary(
            descriptors_to_servicers, self._real_time)
        self._fake_time_server = grpc_testing.server_from_dictionary(
            descriptors_to_servicers, self._fake_time)

    def test_successful_Square(self):
        rpc = self._real_time_server.invoke_unary_unary(
            target_service.methods_by_name['Square'], (),
            CalculationRequest(value=2), None)

        actual, trailing_metadata, code, details = rpc.termination()
        expected = CalculationResponse(value=4)

        self.assertEqual(expected, actual)
        self.assertIs(code, grpc.StatusCode.OK)

    def test_successful_NaturalNumberGenerator(self):
        rpc = self._real_time_server.invoke_unary_stream(
            target_service.methods_by_name['NaturalNumberGenerator'], (),
            CalculationRequest(value=2), None)

        actual = [
            rpc.take_response(),
            rpc.take_response(),
        ]
        trailing_metadata, code, details = rpc.termination()
        expected = [
            CalculationResponse(value=1),
            CalculationResponse(value=2)
        ]

        self.assertEqual(expected[0], actual[0])
        self.assertEqual(expected[1], actual[1])
        self.assertIs(code, grpc.StatusCode.OK)

    def test_successful_Summation(self):
        rpc = self._real_time_server.invoke_stream_unary(
            target_service.methods_by_name['Summation'], (), None)
        rpc.send_request(CalculationRequest(value=2))
        rpc.send_request(CalculationRequest(value=3))
        rpc.requests_closed()

        actual, trailing_metadata, code, details = rpc.termination()
        expected = CalculationResponse(value=5)

        self.assertEqual(expected, actual)
        self.assertIs(code, grpc.StatusCode.OK)

    def test_successful_Buffer3Sum(self):
        rpc = self._real_time_server.invoke_stream_stream(
            target_service.methods_by_name['Buffer3Sum'], (), None)
        rpc.send_request(CalculationRequest(value=1))
        rpc.send_request(CalculationRequest(value=2))
        rpc.send_request(CalculationRequest(value=3))
        
        actual = rpc.take_response()
        expected = CalculationResponse(value=6)

        self.assertEqual(expected, actual)

        rpc.send_request(CalculationRequest(value=4))
        rpc.send_request(CalculationRequest(value=5))
        rpc.send_request(CalculationRequest(value=6))

        actual = rpc.take_response()
        expected = CalculationResponse(value=15)

        self.assertEqual(expected, actual)

        rpc.send_request(CalculationRequest(value=7))
        rpc.send_request(CalculationRequest(value=8))
        rpc.requests_closed()

        trailing_metadata, code, details = rpc.termination()
        actual = rpc.take_response()
        expected = CalculationResponse(value=15)

        self.assertEqual(expected, actual)
        self.assertIs(code, grpc.StatusCode.OK)


if __name__ == "__main__":
    unittest.main()
