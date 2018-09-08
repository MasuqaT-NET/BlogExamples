from random import randint

from google.protobuf.empty_pb2 import Empty

from cowsay_client import CowsayClient
from quote_pb2 import RandomQuoteRequest, RandomQuoteResponse, SecretKeyResponse
from quote_pb2_grpc import QuoteServicer


class QuoteService(QuoteServicer):
    def __init__(self, cowsay_client: CowsayClient, secret_key):
        self.cowsay_client = cowsay_client
        self.secret_key = secret_key

    def GetRandomQuote(self, request: RandomQuoteRequest, context) -> RandomQuoteResponse:
        invocation_metadata = context.invocation_metadata()
        print(f"metadata from client: {invocation_metadata}")
        r = randint(0, 1)
        if r == 0:
            animal = 'cow'
        elif r == 1:
            animal = 'tux'
        else:
            animal = 'unknown'

        additional_message = next((value for (key, value) in invocation_metadata if key == 'additional'), '')
        message = request.message + (f" with {additional_message}" if additional_message else '')
        result = self.cowsay_client.get_quote(animal, message)
        context.send_initial_metadata([('initial-success', 'foo')])
        context.set_trailing_metadata([('trailing-success', 'bar')])
        return RandomQuoteResponse(output=result)

    def GetSecretKey(self, request: Empty, context):
        return SecretKeyResponse(key=self.secret_key)
