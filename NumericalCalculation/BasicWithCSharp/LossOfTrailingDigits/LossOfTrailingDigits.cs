using System;

namespace LossOfTrailingDigits
{
	public class LossOfTrailingDigits
	{
		public static void Main(string[] args)
		{
			FloatCheckLoss();

			Console.WriteLine();

			DoubleCheckLoss();
		}

		static void FloatCheckLoss()
		{
			const int Max = 1000000; // 10^6

			float countUpSum = 0.0f;
			for (int i = 1; i <= Max; i++)
			{
				countUpSum += 1.0f / i / (i + 1);
			}

			float countDownSum = 0.0f;
			for (int i = Max; i > 0; i--)
			{
				countDownSum += 1.0f / i / (i + 1);
			}

			Console.WriteLine($"count up:  {countUpSum:F8}");
			Console.WriteLine($"count down:{countDownSum:F8}");
			Console.WriteLine($"solution:  {(float)Max / (Max + 1):F8}");
		}

		static void DoubleCheckLoss()
		{
			const int Max = 1000000000; // 10^9

			double countUpSum = 0.0;
			for (int i = 1; i <= Max; i++)
			{
				countUpSum += 1.0 / i / (i + 1);
			}

			double countDownSum = 0.0;
			for (int i = Max; i > 0; i--)
			{
				countDownSum += 1.0 / i / (i + 1);
			}

			Console.WriteLine($"count up:  {countUpSum:F16}");
			Console.WriteLine($"count down:{countDownSum:F16}");
			Console.WriteLine($"solution:  {(double)Max / (Max + 1):F16}");
		}
	}
}
