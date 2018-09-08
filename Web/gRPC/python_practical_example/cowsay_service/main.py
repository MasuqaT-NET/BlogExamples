from concurrent import futures
from time import sleep

import grpc

import cowsay_pb2_grpc
from cowsay_service import CowsayService

if __name__ == '__main__':
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
    cowsay_pb2_grpc.add_CowsayServicer_to_server(CowsayService(), server)
    server.add_insecure_port('[::]:50050')
    server.start()
    print('Cowsay Service has started with port 50050.')
    try:
        while True:
            sleep(60 * 60 * 24)
    except KeyboardInterrupt:
        server.stop(0)
