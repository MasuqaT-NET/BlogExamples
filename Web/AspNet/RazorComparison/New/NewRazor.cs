using Microsoft.AspNetCore.Razor;
using Microsoft.AspNetCore.Razor.CodeGenerators;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using System;
using System.IO;
using System.Reflection;
using System.Runtime.Loader;
using System.Text;
using System.Threading.Tasks;

namespace New
{
	public class NewRazor
	{
		public static void Main(string[] args)
		{
			Run().Wait();
		}

		static async Task Run()
		{
			// ホスト生成
			var language = new CSharpRazorCodeLanguage();
			var host = new RazorEngineHost(language)
			{
				DefaultBaseClass = nameof(New) + "." + nameof(NewTemplateBase),
				DefaultClassName = "Generated",
				DefaultNamespace = "RazorTemplate",
				// 生成されるメソッド名の指定（これはデフォルトと同じものを指定している）
				GeneratedClassContext = new GeneratedClassContext(
					nameof(NewTemplateBase.ExecuteAsync),
					nameof(NewTemplateBase.Write),
					nameof(NewTemplateBase.WriteLiteral),
					new GeneratedTagHelperContext { }
				)
			};
			// デフォルトで挿入する名前空間を追加
			host.NamespaceImports.Add(nameof(System));
			host.NamespaceImports.Add(nameof(System) + "." + nameof(System.Threading) + "." + nameof(System.Threading.Tasks));

			var engine = new RazorTemplateEngine(host);
			using (var reader = new StreamReader(File.OpenRead("../Page.cshtml")))
			{
				//ソースコード生成
				var generatorResults = engine.GenerateCode(reader);
				string source = generatorResults.GeneratedCode;

				//表示用
				Console.Write(source);
				Console.WriteLine("------------------------------------------------------------------------");

				var dllBase = Path.GetDirectoryName(typeof(object).GetTypeInfo().Assembly.Location);
				//使用アセンブリ参照
				var references = new MetadataReference[]
				{
					MetadataReference.CreateFromFile(typeof(object).GetTypeInfo().Assembly.Location),
					MetadataReference.CreateFromFile(dllBase + @"\mscorlib.dll"),
					MetadataReference.CreateFromFile(dllBase + @"\System.Runtime.dll"),
					MetadataReference.CreateFromFile(dllBase + @"\System.Linq.dll"),
					MetadataReference.CreateFromFile(dllBase + @"\System.Threading.Tasks.dll"),
					MetadataReference.CreateFromFile(typeof(NewTemplateBase).GetTypeInfo().Assembly.Location)
				};

				//コンパイル
				var compilation = CSharpCompilation.Create("NewPage")
					.WithOptions(new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary))
					.AddReferences(references)
					.AddSyntaxTrees(CSharpSyntaxTree.ParseText(source));

				using (var ms = new MemoryStream())
				{
					var result = compilation.Emit(ms);
					ms.Seek(0, SeekOrigin.Begin);
					var assembly = AssemblyLoadContext.Default.LoadFromStream(ms);

					//実行
					var typeName = host.DefaultNamespace + "." + host.DefaultClassName;
					var instance = assembly.CreateInstance(typeName) as NewTemplateBase;// .GetMethod(nameof(NewTemplateBase.Execute))
					var generatedString = await instance.GenerateAsync();

					//結果表示
					Console.Write(generatedString);
				}
			}
		}
	}

	public abstract class NewTemplateBase
	{
		StringBuilder builder = new StringBuilder();

		public void Write(object value)
		{
			builder.Append(value);
		}

		public void WriteLiteral(string literal)
		{
			builder.Append(literal);
		}

		public abstract Task ExecuteAsync();

		public async Task<string> GenerateAsync()
		{
			await ExecuteAsync();
			return builder.ToString();
		}
	}
}
