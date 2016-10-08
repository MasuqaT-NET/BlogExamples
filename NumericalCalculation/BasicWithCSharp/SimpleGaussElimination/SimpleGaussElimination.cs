using System;
using System.Linq;

namespace SimpleGaussElimination
{
	public class SimpleGaussElimination
	{
		public static void Main(string[] args)
		{
			Solve();
		}

		static void WriteEquations(double[,] leftMatrix, double[] rightVector)
		{
			var rowCount = rightVector.Length;
			if (rowCount != leftMatrix.GetLength(0))
			{
				throw new ArgumentException();
			}

			for (int i = 0; i < rowCount; i++)
			{
				for (int j = 0; j < leftMatrix.GetLength(1); j++)
				{
					Console.Write($"{leftMatrix[i, j],8:F4} ");
				}

				Console.WriteLine($" | {rightVector[i],8:F4}");
			}
		}

		static void Solve()
		{
			const int Dimension = 4;

			double[,] matrixA = new double[Dimension, Dimension]
			{
				{ 2, 3, 1, 4 },
				{ 4, 1, -3, -2 },
				{ -1, 2, 2, 1 },
				{ 3, -4, 4, 3 },
			};

			double[] vectorB = new double[Dimension]
			{
				10,
				0,
				4,
				6
			};

			double[] solutionX;

			Console.WriteLine("初期状態");
			WriteEquations(matrixA, vectorB);
			Console.WriteLine();

			// 前進消去
			for (int i = 0; i < Dimension - 1; i++)
			{
				for (int j = i + 1; j < Dimension; j++)
				{
					var s = matrixA[j, i] / matrixA[i, i];
					for (int k = i; k < Dimension; k++)
					{
						matrixA[j, k] -= matrixA[i, k] * s;
					}
					vectorB[j] -= vectorB[i] * s;
				}
			}

			Console.WriteLine("前進消去後");
			WriteEquations(matrixA, vectorB);
			Console.WriteLine();

			solutionX = new double[Dimension];
			// 後退代入
			for (int i = Dimension - 1; i >= 0; i--)
			{
				var s = vectorB[i];
				for (int j = i + 1; j < Dimension; j++)
				{
					s -= matrixA[i, j] * solutionX[j];
				}
				solutionX[i] = s / matrixA[i, i];
			}

			Console.WriteLine("後退代入後");
			WriteEquations(matrixA, vectorB);
			Console.WriteLine();

			Console.WriteLine("解");
			Console.WriteLine(string.Join("\n", solutionX.Select(x => $"{x,8:F4}")));
		}
	}
}
