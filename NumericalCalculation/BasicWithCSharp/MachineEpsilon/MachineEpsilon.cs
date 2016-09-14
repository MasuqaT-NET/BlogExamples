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
		float a = 1.0f;
		float b = a + 1.0f;

		while (b > 1.0f)
		{
			a *= 0.5f;
			b = 1.0f + a;

			Console.WriteLine($"{b:e30}");
		}

		Console.WriteLine($"1+ϵ : {(1.0f + a):e30}");
		Console.WriteLine($"1+2ϵ: {(1.0f + a * 2.0f):e30}");
		Console.WriteLine($"float machine epsilon: {a:e30}");
	}

	static void CalcDoubleEpsilon()
	{
		double a = 1.0;
		double b = a + 1.0;

		while (b > 1.0)
		{
			a *= 0.5;
			b = 1.0 + a;

			Console.WriteLine($"{b:e30}");
		}

		Console.WriteLine($"1+ϵ : {(1.0 + a):e30}");
		Console.WriteLine($"1+2ϵ: {(1.0 + a * 2.0):e30}");
		Console.WriteLine($"double machine epsilon: {a:e30}");
	}

	static void CalcDecimalEpsilon()
	{
		decimal a = 1.0m;
		decimal b = a + 1.0m;

		while (b > 1.0m)
		{
			a *= 0.5m;
			b = 1.0m + a;

			Console.WriteLine($"{b:e30}");
		}

		Console.WriteLine($"1+ϵ : {(1.0m + a):e30}");
		Console.WriteLine($"1+2ϵ: {(1.0m + a * 2.0m):e30}");
		Console.WriteLine($"decimal machine epsilon: {a:e30}");
	}
}