from calculator_pb2 import CalculationResponse
import calculator_pb2_grpc


class CalculatorService(calculator_pb2_grpc.CalculatorServicer):
    def Square(self, request, context):
        return CalculationResponse(value=request.value * request.value)

    def NaturalNumberGenerator(self, request, context):
        for i in range(request.value):
            yield CalculationResponse(value=i + 1)

    def Summation(self, request_iterator, context):
        s = 0
        for req in request_iterator:
            s += req.value
        return CalculationResponse(value=s)

    def Buffer3Sum(self, request_iterator, context):
        buffer = []
        for req in request_iterator:
            buffer.append(req.value)
            if len(buffer) == 3:
                yield CalculationResponse(value=sum(buffer))
                buffer = []
        if len(buffer) > 0:
            yield CalculationResponse(value=sum(buffer))
