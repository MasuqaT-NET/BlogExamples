using Microsoft.CSharp;
using System;
using System.CodeDom.Compiler;
using System.IO;
using System.Text;
using System.Web.Razor;
using System.Web.Razor.Generator;

namespace Legacy
{
	class LegacyRazor
	{
		static void Main(string[] args)
		{
			Run();
		}

		static void Run()
		{
			// ホスト作成
			var language = new CSharpRazorCodeLanguage();
			var host = new RazorEngineHost(language)
			{
				DefaultBaseClass = nameof(Legacy) + "." + nameof(LegacyTemplateBase),
				DefaultClassName = "Generated",
				DefaultNamespace = "RazorTemplate",
				// 生成されるメソッド名の指定（これはデフォルトと同じものを指定している）
				GeneratedClassContext = new GeneratedClassContext(
					nameof(LegacyTemplateBase.Execute),
					nameof(LegacyTemplateBase.Write),
					nameof(LegacyTemplateBase.WriteLiteral)
				)
			};
			// デフォルトで挿入する名前空間を追加
			host.NamespaceImports.Add(nameof(System));

			var engine = new RazorTemplateEngine(host);
			using (var reader = new StreamReader(File.OpenRead("../../../Page.cshtml")))
			{
				// コードDOM生成
				var generatorResults = engine.GenerateCode(reader);
				System.CodeDom.CodeCompileUnit unit = generatorResults.GeneratedCode;
				var provider = new CSharpCodeProvider();

				// 表示用
				provider.GenerateCodeFromCompileUnit(unit, Console.Out, new CodeGeneratorOptions());
				Console.WriteLine("------------------------------------------------------------------------");

				// 使用アセンブリ参照
				var parameters = new CompilerParameters();
				parameters.ReferencedAssemblies.Add("System.Core.dll");
				parameters.ReferencedAssemblies.Add(typeof(LegacyTemplateBase).Assembly.Location);

				// コンパイル
				var compilerResults = provider.CompileAssemblyFromDom(parameters, unit);

				// 実行
				var typeName = host.DefaultNamespace + "." + host.DefaultClassName;
				var instance = compilerResults.CompiledAssembly.CreateInstance(typeName) as LegacyTemplateBase;
				var generatedString = instance.Generate();

				// 結果表示
				Console.Write(generatedString);
			}
		}
	}

	public abstract class LegacyTemplateBase
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

		public abstract void Execute();

		public string Generate()
		{
			Execute();
			return builder.ToString();
		}
	}
}
