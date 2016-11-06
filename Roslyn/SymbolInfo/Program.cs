using System;
using System.Linq;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Reflection;

namespace SymbolInfo
{
	public class Program
	{
		public static void Main(string[] args)
		{
			var code = @"
using System;

class Class1
{
	const int A_Constant = 1;
	int b_field = 1;
	int C_Property { get; set; } = 1;
	static int D_StaticProperty { get; set; } = 1;
	Action<int> E_FieldAction = (_) => Console.WriteLine();

	void Method1()
	{
		int f_Local = 1;
		var c2 = new Class2();
		Method2(A_Constant);
		Method2(b_field);
		Method2(C_Property);
		Method2(D_StaticProperty);
		Method2(f_Local);
		Method2(c2.G_Class2Property);
		Method2(Class2.H_Class2StaticProperty);
		Method3(E_FieldAction);
		Method3(Method2);
	}

	// these are not checked
	void Method2(int arg) { }
	void Method3(Action<int> method) { }
}

class Class2
{
	public int G_Class2Property { get; set; } = 1;
	public static int H_Class2StaticProperty { get; set; } = 1;
}";

			var tree = CSharpSyntaxTree.ParseText(code);
			var mscorlib = MetadataReference.CreateFromFile(typeof(object).GetTypeInfo().Assembly.Location);
			var compilation = CSharpCompilation.Create("NumericLiteral", new[] { tree }, new[] { mscorlib });
			var model = compilation.GetSemanticModel(tree);

			var root = tree.GetRoot();
			var variables = root.DescendantNodes().OfType<ExpressionStatementSyntax>()
				.Select(x => x.DescendantNodes().OfType<ArgumentSyntax>().First().Expression);
			var symbolInfos = variables.Select(x => model.GetSymbolInfo(x));

			foreach (var infos in symbolInfos)
			{
				var symbol = infos.Symbol;
				string typeString = string.Empty;
				switch (symbol.Kind)
				{
					case SymbolKind.Field:
						var fieldSymbol = symbol as IFieldSymbol;
						typeString = fieldSymbol.Type.ToString();
						break;

					case SymbolKind.Local:
						var localSymbol = symbol as ILocalSymbol;
						typeString = localSymbol.Type.ToString();
						break;

					case SymbolKind.Method:
						var methodSymbol = symbol as IMethodSymbol;
						typeString
							= $"({string.Join(", ", methodSymbol.Parameters.Select(x => x.Type.ToString()))})"
							+ $" -> {methodSymbol.ReturnType}";
						break;

					case SymbolKind.Property:
						var propertySymbol = symbol as IPropertySymbol;
						typeString = propertySymbol.Type.ToString();
						break;

					default:
						break;
				}

				Console.WriteLine(symbol.Name);
				Console.WriteLine($" -> {symbol.Kind}, {symbol.ContainingType}, {typeString}");
				Console.WriteLine();
			}
		}
	}
}