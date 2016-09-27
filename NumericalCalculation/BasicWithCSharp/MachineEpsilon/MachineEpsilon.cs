using System;

public class MachineEpsilon
{
	public static void Main(string[] args)
	{
		CalcFloatEpsilon();

		Console.WriteLine();

		CalcDoubleEpsilon();

		Console.WriteLine();

		CalcDecimalEpsilon();
	}

	static void CalcFloatEpsilon()
	{
		float eps = 1.0f;

		while (1.0f + eps / 2.0f > 1.0f)
		{
			eps /= 2.0f;

			Console.WriteLine($"{(1.0f + eps):e30}");
		}

		Console.WriteLine($"1+eps  : {(1.0f + eps):e30}");
		Console.WriteLine($"1+eps/2: {(1.0f + eps / 2.0f):e30}");
		Console.WriteLine($"float machine epsilon: {eps:e30}");
	}

	static void CalcDoubleEpsilon()
	{
		double eps = 1.0;

		while (1.0 + eps / 2.0 > 1.0)
		{
			eps /= 2.0;

			Console.WriteLine($"{(1.0 + eps):e30}");
		}

		Console.WriteLine($"1+eps  : {(1.0 + eps):e30}");
		Console.WriteLine($"1+eps/2: {(1.0 + eps / 2.0):e30}");
		Console.WriteLine($"double machine epsilon: {eps:e30}");
	}

	static void CalcDecimalEpsilon()
	{
		decimal eps = 1.0m;

		while (1.0m + eps / 2.0m > 1.0m)
		{
			eps /= 2.0m;

			Console.WriteLine($"{(1.0m + eps):e30}");
		}

		Console.WriteLine($"1+eps  : {(1.0m + eps):e30}");
		Console.WriteLine($"1+eps/2: {(1.0m + eps / 2.0m):e30}");
		Console.WriteLine($"decimal machine epsilon: {eps:e30}");
	}
}