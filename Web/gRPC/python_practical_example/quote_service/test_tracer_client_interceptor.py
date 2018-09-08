from unittest import TestCase
from unittest.mock import MagicMock

from grpc import Call
from grpc._cython.cygrpc import _Metadatum
from grpc._interceptor import _ClientCallDetails

from tracer_client_interceptor import TracerClientInterceptor


class TestTracerClientInterceptor(TestCase):
    def test(self):
        interceptor = TracerClientInterceptor()

        mock_continuation = MagicMock()
        call_details = _ClientCallDetails('/test/Foo', None, [('a', 'b')], None)
        request = ()
        mock_call = MagicMock()  # type: Call
        mock_call.initial_metadata.return_value = [_Metadatum('c', 'd')]
        mock_continuation.return_value = mock_call
        response = interceptor.intercept_unary_unary(mock_continuation, call_details, request)  # type: Call
        mock_continuation.assert_called_once_with(
            _ClientCallDetails('/test/Foo', None, [('a', 'b'), ('tracer', 'This is from interceptor')], None), request)

        self.assertIn(_Metadatum('c', 'd'), response.initial_metadata())
        self.assertIn(_Metadatum('tracer', 'aaaa!'), response.initial_metadata())
