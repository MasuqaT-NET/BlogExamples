from concurrent import futures
from time import sleep

import grpc

import quote_pb2_grpc
from cowsay_client import CowsayClient
from cowsay_pb2_grpc import CowsayStub
from key_auth_server_interceptor import KeyAuthServerInterceptor
from quote_service import QuoteService
from tracer_client_interceptor import TracerClientInterceptor

if __name__ == '__main__':
    secret_key = "password"
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10),
                         interceptors=[KeyAuthServerInterceptor(secret_key)])

    tracer_client_interceptor = TracerClientInterceptor()
    cowsay_channel = grpc.insecure_channel('localhost:50050')
    cowsay_intercepted_channel = grpc.intercept_channel(cowsay_channel, tracer_client_interceptor)
    cowsay_stub = CowsayStub(cowsay_intercepted_channel)
    cowsay_client = CowsayClient(cowsay_stub)

    quote_pb2_grpc.add_QuoteServicer_to_server(QuoteService(cowsay_client, secret_key), server)
    server.add_insecure_port('[::]:50051')
    server.start()
    print('Quote Service has started with port 50051.')
    try:
        while True:
            sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)
