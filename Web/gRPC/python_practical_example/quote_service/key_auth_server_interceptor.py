from grpc import StatusCode, ServerInterceptor, unary_unary_rpc_method_handler


def unauthenticated_process(ignored_request, context):
    context.send_initial_metadata([('initial-fail', "a")])
    context.set_trailing_metadata([('trailing-fail', "b")])
    context.abort(StatusCode.UNAUTHENTICATED, 'Secret key is wrong!')


class KeyAuthServerInterceptor(ServerInterceptor):
    def __init__(self, secret_key):
        self._secret_key = secret_key

    def intercept_service(self, continuation, handler_call_details):
        if handler_call_details.method.endswith('GetSecretKey') or (
                'secret-key', self._secret_key) in handler_call_details.invocation_metadata:
            return continuation(handler_call_details)
        else:
            return unary_unary_rpc_method_handler(unauthenticated_process)
