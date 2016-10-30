using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Reflection;

namespace NumericLiteral
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var code = @"
			class Class1
			{
				void Method1()
				{
					const int A = 1;
					var foo = 1;
					var array = new object[]
					{
						-1.2f*2+A,
						1.0+foo,
						10.1,
						20m,
						1,
						(byte)255,
						'c',
						nameof(Class1)+""!""
					};
				}
			}";

			var tree = CSharpSyntaxTree.ParseText(code);
			var mscorlib = MetadataReference.CreateFromFile(typeof(object).GetTypeInfo().Assembly.Location);
			var compilation = CSharpCompilation.Create("NumericLiteral", new[] { tree }, new[] { mscorlib });
			var model = compilation.GetSemanticModel(tree);

			var values = tree.GetRoot().DescendantNodes().OfType<ArrayCreationExpressionSyntax>().First()
				.ChildNodes().OfType<InitializerExpressionSyntax>().First()
				.ChildNodes();
			foreach (var item in values)
			{
				var constant = model.GetConstantValue(item);
				Console.WriteLine($"{item.WithoutTrivia().ToFullString()}\n" +
					$" -> {(constant.HasValue ? $"{constant.Value} <{constant.Value.GetType()}>" : "null")}\n");
			}
		}
	}
}