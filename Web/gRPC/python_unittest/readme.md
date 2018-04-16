# gRPC Python Unit Test

## Structure

* calculator.proto  
  Protocol Buffer file for this example.
* client/  
  Client side library with "stub" which is the target of unit test.
* server/  
  Server side "servicer" implementation  which is the target of another unit test.

## References
* https://github.com/grpc/grpc/blob/master/src/python/grpcio_tests/tests/testing/_server_test.py
* https://github.com/grpc/grpc/blob/master/src/python/grpcio_tests/tests/testing/_client_test.py
