import grpc
from google.protobuf.empty_pb2 import Empty

from key_auth_client_interceptor import KeyAuthClientInterceptor
from quote_pb2 import RandomQuoteRequest
from quote_pb2_grpc import QuoteStub

if __name__ == '__main__':
    channel = grpc.insecure_channel('localhost:50051')
    key_auth_client_interceptor = KeyAuthClientInterceptor()
    intercepted_channel = grpc.intercept_channel(channel, key_auth_client_interceptor)
    stub = QuoteStub(intercepted_channel)
    try:
        req = RandomQuoteRequest(message='hoge')
        f = stub.GetRandomQuote.future(req, metadata=[('additional', '!@#$'), ('debug', 'fuga')])
        response = f.result()
        print(f"{f.code().name}: {f.details()}: with {f.initial_metadata()} + {f.trailing_metadata()}")
        print(response.output)
    except grpc.RpcError as e:
        print(f"{e.code().name}: {e.details()}: with {e.initial_metadata()} + {e.trailing_metadata()}")

    print('----------------------------------------------------------------')

    key = None
    try:
        response = stub.GetSecretKey(Empty())
        key = response.key
        print(f"key = '{key}'")
    except grpc.RpcError as e:
        print(f"{e.code().name}: {e.details()}")

    print('----------------------------------------------------------------')

    key_auth_client_interceptor.secret_key = key
    try:
        req = RandomQuoteRequest(message='hoge')
        f = stub.GetRandomQuote.future(req, metadata=[('additional', '!@#$'), ('debug', 'fuga')])
        print(f"{f.code().name}: {f.details()}: with {f.initial_metadata()} + {f.trailing_metadata()}")
        response = f.result()
        print(response.output)
    except grpc.RpcError as e:
        print(f"{e.code().name}: {e.details()}: with {e.initial_metadata()} + {e.trailing_metadata()}")
