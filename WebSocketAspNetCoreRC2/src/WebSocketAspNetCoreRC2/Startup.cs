using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System.Net.WebSockets;
using System.Threading;
using System.Text;
using System.Collections.Concurrent;

namespace WebSocketAspNetCoreRC2
{
	public class Startup
	{
		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app)
		{
			var options = new WebSocketOptions { ReceiveBufferSize = 4096 };
			app.UseWebSockets(options);

			/*
			 * This form is OK (it seems normal than examples below)
			 * I used Map method to show 3 examples in 1 file.
			 * http://localhost:5000/
			 * 
			app.Use(async (context, next) =>
			{
				if (context.WebSockets.IsWebSocketRequest)
				{
					// process...
				}
				else
				{
					await next();
				}
			});
			*/

			/*
			 * Bad example
			 * Echoes message only once (lose connection after echo)
			 * http://localhost:5000/Once
			 */
			app.Map("/Bad", once =>
			{
				once.Use(async (context, next) =>
				{
					if (context.WebSockets.IsWebSocketRequest)
					{
						// WebSocket request
						using (var socket = await context.WebSockets.AcceptWebSocketAsync())
						{
							if (socket?.State == WebSocketState.Open)
							{
								// Handle the socket
								var receiveToken = CancellationToken.None;
								var receiveBuffer = new ArraySegment<byte>(new byte[4096]);

								var received = await socket.ReceiveAsync(receiveBuffer, receiveToken);
								if (received.MessageType == WebSocketMessageType.Text)
								{
									var text = Encoding.UTF8.GetString(receiveBuffer.Array, receiveBuffer.Offset, receiveBuffer.Count);

									// echo
									var sendingToken = CancellationToken.None;
									var sendingData = Encoding.UTF8.GetBytes(text);
									var sendingBuffer = new ArraySegment<byte>(sendingData);
									await socket.SendAsync(sendingBuffer, WebSocketMessageType.Text, true, sendingToken);
								}
							}
						}
					}
					else
					{
						await next();
					}
				});
			});

			/*
			 * Single example
			 * Echoes message until close connection
			 * http://localhost:5000/Once
			 */
			app.Map("/Single", once =>
			{
				once.Use(async (context, next) =>
				{
					if (context.WebSockets.IsWebSocketRequest)
					{
						// WebSocket request
						using (var socket = await context.WebSockets.AcceptWebSocketAsync())
						{
							if (socket?.State == WebSocketState.Open)
							{
								// Handle the socket
								var receiveToken = CancellationToken.None;
								var receiveBuffer = new ArraySegment<byte>(new byte[4096]);

								var received = await socket.ReceiveAsync(receiveBuffer, receiveToken);

								// Binary -> fail, Close -> close connection
								while (received.MessageType == WebSocketMessageType.Text)
								{
									var text = Encoding.UTF8.GetString(receiveBuffer.Array, receiveBuffer.Offset, receiveBuffer.Count);

									// echo
									var sendingToken = CancellationToken.None;
									var sendingData = Encoding.UTF8.GetBytes(text);
									var sendingBuffer = new ArraySegment<byte>(sendingData);
									await socket.SendAsync(sendingBuffer, WebSocketMessageType.Text, true, sendingToken);

									received = await socket.ReceiveAsync(receiveBuffer, receiveToken);
								}

								var closeToken = CancellationToken.None;
								await socket.CloseAsync(received.CloseStatus.Value, received.CloseStatusDescription, closeToken);
							}
						}
					}
					else
					{
						await next();
					}
				});
			});

			/*
			 * Broadcast example
			 * Sends message to all connections until close connection
			 * http://localhost:5000/Once
			 */
			var allSockets = new ConcurrentBag<WebSocket>();

			app.Map("/Broadcast", once =>
			{
				once.Use(async (context, next) =>
				{
					if (context.WebSockets.IsWebSocketRequest)
					{
						// WebSocket request
						using (var socket = await context.WebSockets.AcceptWebSocketAsync())
						{
							if (socket?.State == WebSocketState.Open)
							{
								allSockets.Add(socket);

								// Handle the socket
								var receiveToken = CancellationToken.None;
								var receiveBuffer = new ArraySegment<byte>(new byte[4096]);

								var received = await socket.ReceiveAsync(receiveBuffer, receiveToken);

								// Binary -> fail, Close -> close connection
								while (received.MessageType == WebSocketMessageType.Text)
								{
									var text = Encoding.UTF8.GetString(receiveBuffer.Array, receiveBuffer.Offset, receiveBuffer.Count);

									// echo
									var sendingToken = CancellationToken.None;
									var sendingData = Encoding.UTF8.GetBytes(text);
									var sendingBuffer = new ArraySegment<byte>(sendingData);

									// send message to all connections
									await Task.WhenAll(allSockets.Where(x => x?.State == WebSocketState.Open)
										.Select(x => x.SendAsync(sendingBuffer, WebSocketMessageType.Text, true, sendingToken)));

									received = await socket.ReceiveAsync(receiveBuffer, receiveToken);
								}

								var closeToken = CancellationToken.None;
								await socket.CloseAsync(received.CloseStatus.Value, received.CloseStatusDescription, closeToken);
							}
						}
					}
					else
					{
						await next();
					}
				});
			});

			app.Run(async (context) =>
			{
				await context.Response.WriteAsync("WebSocket is available.");
			});
		}
	}
}
