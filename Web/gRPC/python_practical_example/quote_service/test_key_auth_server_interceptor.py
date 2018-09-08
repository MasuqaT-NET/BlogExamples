from unittest import TestCase
from unittest.mock import Mock

from grpc import StatusCode
from grpc._cython.cygrpc import _Metadatum
from grpc._server import _HandlerCallDetails

from key_auth_server_interceptor import KeyAuthServerInterceptor


class TestKeyAuthServerInterceptor(TestCase):
    def test_deny_without_key(self):
        interceptor = KeyAuthServerInterceptor('key')

        mock_continuation = Mock()
        handler = interceptor.intercept_service(mock_continuation,
                                                _HandlerCallDetails('/test/Foo', [_Metadatum('a', 'b')]))
        mock_continuation.assert_not_called()

        request = ()
        mock_context = Mock()
        handler.unary_unary(request, mock_context)
        mock_context.send_initial_metadata.assert_called_with([('initial-fail', "a")])
        mock_context.set_trailing_metadata.assert_called_with([('trailing-fail', "b")])
        mock_context.abort.assert_called_once_with(StatusCode.UNAUTHENTICATED, 'Secret key is wrong!')

    def test_allow_with_key(self):
        interceptor = KeyAuthServerInterceptor('key')

        mock_continuation = Mock()
        mock_continuation.return_value = 'aaa'
        result = interceptor.intercept_service(mock_continuation, _HandlerCallDetails('/test/Foo',
                                                                                      [_Metadatum('a', 'b'),
                                                                                       _Metadatum('secret-key',
                                                                                                  'key')]))
        mock_continuation.assert_called()
        self.assertEqual('aaa', result)

    def test_allow_with_special_method(self):
        interceptor = KeyAuthServerInterceptor('key')

        mock_continuation = Mock()
        mock_continuation.return_value = 'aaa'
        result = interceptor.intercept_service(mock_continuation,
                                               _HandlerCallDetails('/test/GetSecretKey', [_Metadatum('a', 'b')]))
        mock_continuation.assert_called()
        self.assertEqual('aaa', result)
