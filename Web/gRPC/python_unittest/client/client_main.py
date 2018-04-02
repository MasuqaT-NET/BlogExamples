import grpc

import calculator_pb2_grpc
from calculator_pb2 import CalculationRequest


def generator(max_value):
    for v in range(1, max_value + 1):
        yield CalculationRequest(value=v)


def run():
    channel = grpc.insecure_channel('localhost:50051')
    stub = calculator_pb2_grpc.CalculatorStub(channel)
    print(stub.Square(CalculationRequest(value=7)).value)
    int_set = stub.NaturalNumberGenerator(CalculationRequest(value=7))
    for v in int_set:
        print(v.value)
    print(stub.Summation(generator(7)).value)
    sums = stub.Buffer3Sum(generator(7))
    for s in sums:
        print(s.value)


if __name__ == '__main__':
    run()
