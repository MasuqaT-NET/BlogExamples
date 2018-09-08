from cowpy.cow import Cowacter, Tux
from grpc import StatusCode

from cowsay_pb2 import QuoteRequest, QuoteResponse
from cowsay_pb2_grpc import CowsayServicer


class CowsayService(CowsayServicer):
    def __init__(self):
        self.cow = Cowacter()
        self.tux = Tux()

    def GetQuote(self, request: QuoteRequest, context) -> QuoteResponse:
        message = request.message
        print(f"'{message}' with {context.invocation_metadata()}")

        if request.animal == QuoteRequest.COW:
            context.send_initial_metadata([('character', 'cow')])
            return QuoteResponse(output=self.cow.milk(message))
        if request.animal == QuoteRequest.TUX:
            context.send_initial_metadata([('character', 'tux')])
            return QuoteResponse(output=self.tux.milk(message))

        context.set_code(StatusCode.INVALID_ARGUMENT)
        context.set_details('Invalid animal!')
        return super().GetQuote(request, context)
