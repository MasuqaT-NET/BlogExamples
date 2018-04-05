import grpc

from calculator_pb2 import CalculationRequest
from client.client_lib import Connector


def generator(max_value):
    for v in range(1, max_value + 1):
        yield CalculationRequest(value=v)


def run():
    channel = grpc.insecure_channel('localhost:50051')
    connector = Connector(channel)

    print("Square")
    print(connector.square(7))
    print()

    print("NaturalNumberGenerator")
    int_array = connector.natural_numbers_lq(7)
    for v in int_array:
        print(v)
    print()

    print("Summation")
    print(connector.summation([1, 2, 3, 4, 5, 6, 7]))
    print()

    print("Buffer3Sum")
    int_array = connector.buffer3_sum([1, 2, 3, 4, 5, 6, 7])
    for v in int_array:
        print(v)
    print()


if __name__ == '__main__':
    run()
