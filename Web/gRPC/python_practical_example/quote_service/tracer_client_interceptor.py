from grpc import UnaryUnaryClientInterceptor
from grpc._cython.cygrpc import _Metadatum
from grpc._interceptor import _ClientCallDetails


class TracerClientInterceptor(UnaryUnaryClientInterceptor):
    def intercept_unary_unary(self, continuation, client_call_details, request):
        metadata = []
        if client_call_details.metadata is not None:
            metadata = list(client_call_details.metadata)
        metadata.append(('tracer', 'This is from interceptor'))
        new_details = _ClientCallDetails(client_call_details.method, client_call_details.timeout, metadata,
                                         client_call_details.credentials)
        response = continuation(new_details, request)
        original_initial_metadata = response.initial_metadata
        response.initial_metadata = lambda: original_initial_metadata() + [_Metadatum('tracer', 'aaaa!')]
        return response
