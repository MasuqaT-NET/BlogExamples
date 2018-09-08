import grpc
from grpc._interceptor import _ClientCallDetails


class KeyAuthClientInterceptor(grpc.UnaryUnaryClientInterceptor):
    def __init__(self):
        self.secret_key: str = None

    def intercept_unary_unary(self, continuation, client_call_details, request):
        metadata = []
        if client_call_details.metadata is not None:
            metadata = list(client_call_details.metadata)
        metadata.append(('secret-key', self.secret_key))
        new_details = _ClientCallDetails(client_call_details.method, client_call_details.timeout, metadata,
                                         client_call_details.credentials)
        response = continuation(new_details, request)
        return response
