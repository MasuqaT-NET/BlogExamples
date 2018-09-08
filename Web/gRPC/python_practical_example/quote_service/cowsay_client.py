from cowsay_pb2 import QuoteRequest
from cowsay_pb2_grpc import CowsayStub


class CowsayClient:
    def __init__(self, stub: CowsayStub):
        self.stub = stub

    def get_quote(self, animal: str, message: str) -> str:
        if animal == "cow":
            animal_enum = QuoteRequest.COW
        elif animal == "tux":
            animal_enum = QuoteRequest.TUX
        else:
            raise ValueError(f"{animal} is not supported.")
        req = QuoteRequest(message=message, animal=animal_enum)
        f = self.stub.GetQuote.future(req, metadata=[('z', 'y')])
        print(f"metadata from cowsay service: initial{f.initial_metadata()} and trailing{f.trailing_metadata()}")
        return f.result().output
