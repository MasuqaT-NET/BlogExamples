using System;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using CommonMark;

namespace CommonMarkCms
{
	public class Startup
	{
		const string ContentTemplate = @"
<!DOCTYPE html>
<html>
<head>
<title>{0}</title>
<link href=""/style.css"" rel=""stylesheet"" />
</head>
<body>
{1}
</body>
</html>
";

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
		{
			var contnetDir = env.ContentRootFileProvider.GetDirectoryContents(@"content");
			if (!contnetDir.Exists)
			{
				throw new Exception("\"content\" directory does not exist.");
			}

			app.UseStaticFiles();

			loggerFactory.AddConsole();

			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.Run(async (context) =>
			{
				var pathElements = context.Request.Path.Value.Split('/');
				if (pathElements.Length != 2)
				{
					return;
				}

				var requestName = pathElements[1];
				if (string.IsNullOrEmpty(requestName))
				{
					requestName = "index";
				}

				var file = contnetDir.SingleOrDefault(x => x.Name == requestName + ".md");
				if (file != null)
				{
					using (var stream = file.CreateReadStream())
					using (var reader = new StreamReader(stream))
					{
						var pageContent = await reader.ReadToEndAsync();
						var htmlPart = CommonMarkConverter.Convert(pageContent);
						await context.Response.WriteAsync(string.Format(
							ContentTemplate, requestName, htmlPart));
					}
				}
			});
		}
	}
}
