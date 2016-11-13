using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Reflection;

namespace SemanticModelIntroduction
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var code = @"
namespace Hoge
{
    using static System.Console;
 
    class Foo
    {
        void Method()
        {
            WriteLine(""Hello Notebook!"");

			Write(""Not important"");
		}
	}
}
namespace Piyo
{
	class Bar
	{
		void Method()
		{
			WriteLine(""Hello Canvas!"");
			System.Console.WriteLine(""Log..."");
			System.Console.Write(""Not important"");
		}

		void WriteLine(string str) { /* painting code... */ }
	}
}";

			var tree = CSharpSyntaxTree.ParseText(code);
			var mscorlib = MetadataReference.CreateFromFile(typeof(object).GetTypeInfo().Assembly.Location);
			var compilation = CSharpCompilation.Create("SemanticModel", new[] { tree }, new[] { mscorlib });

			// SemanticModelを取得
			var semanticModel = compilation.GetSemanticModel(tree);

			var root = tree.GetRoot();

			// WriteLineメソッドのSyntax Nodeを取得
			var writeLines = root.DescendantNodes().OfType<InvocationExpressionSyntax>()
				.Select(x => x.Expression).Where(x =>
				{
					if (x is IdentifierNameSyntax)
					{
						return (x as IdentifierNameSyntax).Identifier.Text == nameof(Console.WriteLine);
					}
					else if (x is MemberAccessExpressionSyntax)
					{
						return (x as MemberAccessExpressionSyntax).Name.Identifier.Text == nameof(Console.WriteLine);
					}
					else
					{
						return false;
					}
				});

			foreach (var wl in writeLines)
			{
				// シンボル情報を取得し、メソッドの定義を調べる
				var info = semanticModel.GetSymbolInfo(wl);
				var symbol = info.Symbol;
				var definition = symbol.OriginalDefinition;

				Console.WriteLine(wl.Parent.ToString());
				Console.WriteLine(definition.ToString());
				Console.WriteLine();
			}
		}
	}
}
