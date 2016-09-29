using System;

namespace CancellationOfSignificantDigits
{
	public class CancellationOfSignificantDigits
	{
		public static void Main(string[] args)
		{
			CheckCancellation();
		}

		static Tuple<float, float> NormalSolver(float a, float b, float c)
		{
			float det = (float)Math.Sqrt(b * b - 4 * a * c);
			float x_1 = (-b + det) / 2.0f / a;
			float x_2 = (-b - det) / 2.0f / a;
			return Tuple.Create(x_1, x_2);
		}

		static Tuple<float, float> CaredSolver(float a, float b, float c)
		{
			float det = (float)Math.Sqrt(b * b - 4 * a * c);
			float x_1, x_2;
			if (b > 0)
			{
				x_2 = (-b - det) / 2.0f / a;
				x_1 = c / (a * x_2);
			}
			else
			{
				x_1 = (-b + det) / 2.0f / a;
				x_2 = c / (a * x_1);
			}
			return Tuple.Create(x_1, x_2);
		}

		static void CheckCancellation()
		{
			float a = 1.0f, b = -1000.0f, c = 1.0f; // x^2 - 1000x + c = 0

			var normal = NormalSolver(a, b, c);
			var cared = CaredSolver(a, b, c);

			Console.WriteLine($"normal: x_1= {normal.Item1:F8}, x_2= {normal.Item2:F8}");
			Console.WriteLine($"x_2 -> {(a * normal.Item2 * normal.Item2 + b * normal.Item2 + c):F8}");

			Console.WriteLine($"cared : x_1= {cared.Item1:F8}, x_2= {cared.Item2:F8}");
			Console.WriteLine($"x_2 -> {(a * cared.Item2 * cared.Item2 + b * cared.Item2 + c):F8}");
		}
	}
}
