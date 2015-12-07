using System.IO;
using System.Linq;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.AspNet.FileProviders;
using Microsoft.Extensions.DependencyInjection;
using CommonMark;

namespace MarkdownPages
{
	public class Startup
	{
		const string HtmlTemplate = @"
<!DOCTYPE html>
<html>
<head>
<title>{0}</title>
<link href=""/style.css"" rel=""stylesheet"" />
</head>
<body>
{1}
</body>
</html>";

		// This method gets called by the runtime. Use this method to add services to the container.
		// For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
		public void ConfigureServices(IServiceCollection services)
		{
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app)
		{
			var provider = new PhysicalFileProvider(Directory.GetCurrentDirectory());
			var commonmarks = provider.GetDirectoryContents(@"commonmarks");

			app.UseStaticFiles();

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

				if (commonmarks.Exists && commonmarks.Any(x => x.Name.Split('.')?[0] == requestName))
				{
					var filePath = $"{provider.Root}commonmarks\\{requestName}.md";
					using (var stream = File.OpenRead(filePath))
					using (var reader = new StreamReader(stream))
					{
						var content = await reader.ReadToEndAsync();
						var htmlPart = CommonMarkConverter.Convert(content);
						await context.Response.WriteAsync(string.Format(HtmlTemplate, requestName, htmlPart));

					}
				}
			});
		}

		// Entry point for the application.
		public static void Main(string[] args) => WebApplication.Run<Startup>(args);
	}
}
