using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Reflection;

namespace TypeInfo
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var code = @"
			using System.Collections;
			using System.Collections.Generic;
			class Class1
			{
				void Method1()
				{
					int foo = 1;
					var array = new object[] {
						1.0 + foo,				// double
						typeof(Class1)			// System.Type
					};

					// first
					Method2(array, array, array);

					// second
					Method2(new Class1[1], null, array as IEnumerable<object>);
				}

				// this is just called, do nothing.
				void Method2(object[] _, IEnumerable<object> __, IEnumerable ___) { }
			}";

			var tree = CSharpSyntaxTree.ParseText(code);
			var mscorlib = MetadataReference.CreateFromFile(typeof(object).GetTypeInfo().Assembly.Location);
			var compilation = CSharpCompilation.Create("NumericLiteral", new[] { tree }, new[] { mscorlib });
			var model = compilation.GetSemanticModel(tree);


			var root = tree.GetRoot();
			var values = root.DescendantNodes().OfType<ArrayCreationExpressionSyntax>().First()
				.ChildNodes().OfType<InitializerExpressionSyntax>().First()
				.ChildNodes();
			foreach (var item in values)
			{
				var info = model.GetTypeInfo(item);
				Console.WriteLine($"{item.WithoutTrivia().ToFullString()} : {info.Type}, "
					+ $"(minimum){info.Type?.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)}, "
					+ $"(converted){ info.ConvertedType}");
			}
			Console.WriteLine();

			var calling = root.DescendantNodes().OfType<InvocationExpressionSyntax>().First();
			var symbols = calling.ArgumentList.Arguments.Select(a => a.Expression);
			Console.WriteLine("first " + calling.WithoutTrivia().ToString());
			foreach (var item in symbols.Select((v, i) => new { Index = i, Value = v }))
			{
				var info = model.GetTypeInfo(item.Value);
				Console.WriteLine($"No.{item.Index} : {info.Type}, "
					+ $"(minimum){info.Type?.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)}, "
					+ $"(converted){info.ConvertedType}");
			}
			Console.WriteLine();

			calling = root.DescendantNodes().OfType<InvocationExpressionSyntax>().Skip(1).First();
			symbols = calling.ArgumentList.Arguments.Select(a => a.Expression);
			Console.WriteLine("second " + calling.WithoutTrivia().ToString());
			foreach (var item in symbols.Select((v, i) => new { Index = i, Value = v }))
			{
				var info = model.GetTypeInfo(item.Value);
				Console.WriteLine($"No.{item.Index} : {info.Type}, "
					+ $"(minimum){info.Type?.ToDisplayString(SymbolDisplayFormat.MinimallyQualifiedFormat)}, "
					+ $"(converted){info.ConvertedType}");
			}
		}
	}
}