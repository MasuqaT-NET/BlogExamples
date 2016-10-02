using System;

namespace SimpleGaussJordanElimination
{
	public class SimpleGaussJordanElimination
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

			// 後退消去
			for (int i = Dimension - 1; i >= 0; i--)
			{
				vectorB[i] /= matrixA[i, i];
				matrixA[i, i] = 1; // matrixA[i, i] /= matrixA[i, i]
				for (int j = i - 1; j >= 0; j--)
				{
					var s = matrixA[j, i]; // s = matrixA[j, i] / matrixA[i, i]
					matrixA[j, i] = 0; // matrixA[j, i] -= s
					vectorB[j] -= vectorB[i] * s;
				}
			}

			Console.WriteLine("後退消去後");
			WriteEquations(matrixA, vectorB);
			Console.WriteLine();

			// solutionX = new double[Dimension];
			// for (int i = 0; i < Dimension; i++)
			// {
			// 	solutionX[i] = vectorB[i] / matrixA[i, i];
			// }
			solutionX = vectorB;

			Console.WriteLine("解");
			Console.WriteLine(string.Join("\n", System.Linq.Enumerable.Select(solutionX, x => $"{x,8:F4}")));
		}
	}
}
