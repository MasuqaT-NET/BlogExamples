import calculator_pb2_grpc
from calculator_pb2 import CalculationRequest


class Connector:
    def __init__(self, channel):
        self.stub = calculator_pb2_grpc.CalculatorStub(channel)

    def square(self, number):
        return self.stub.Square(CalculationRequest(value=number)).value

    def natural_numbers_lq(self, number):
        response_iterator = self.stub.NaturalNumberGenerator(CalculationRequest(value=number))
        results = []
        for response in response_iterator:
            results.append(response.value)
        return results

    def summation(self, array):
        def itr():
            for number in array:
                yield CalculationRequest(value=number)

        return self.stub.Summation(itr()).value

    def buffer3_sum(self, array):
        def itr():
            for number in array:
                yield CalculationRequest(value=number)

        response_iterator = self.stub.Buffer3Sum(itr())
        results = []
        for response in response_iterator:
            results.append(response.value)
        return results
