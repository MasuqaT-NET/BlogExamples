using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LUDecomposition
{
	public class LUDecomposition
	{
		public static void Main(string[] args)
		{
			Solve();
		}

		static void WriteMatrix(double[,] matrix)
		{
			for (int i = 0; i < matrix.GetLength(0); i++)
			{
				for (int j = 0; j < matrix.GetLength(1); j++)
				{
					Console.Write($"{matrix[i, j],8:F4} ");
				}

				Console.WriteLine();
			}
		}

		static void WriteVector(double[] vector)
		{
			for (int i = 0; i < vector.Length; i++)
			{
				Console.WriteLine($"{vector[i],8:F4}");
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

			double[,] matrixL = new double[Dimension, Dimension];
			double[,] matrixU = new double[Dimension, Dimension];

			double[] vectorY = new double[Dimension];
			double[] solutionX = new double[Dimension];

			Console.WriteLine("初期状態");
			Console.WriteLine(nameof(matrixA));
			WriteMatrix(matrixA);
			Console.WriteLine(nameof(vectorB));
			WriteVector(vectorB);
			Console.WriteLine();

			// LU分解
			for (int i = 0; i < Dimension - 1; i++)
			{
				for (int j = i + 1; j < Dimension; j++)
				{
					var s = matrixA[j, i] / matrixA[i, i];
					matrixA[j, i] = s;
					for (int k = i + 1; k < Dimension; k++)
					{
						matrixA[j, k] -= matrixA[i, k] * s;
					}
				}
			}

			// サンプル用にコピー 不要な処理
			for (int i = 0; i < Dimension; i++)
			{
				matrixL[i, i] = 1.0;
				for (int j = 0; j < i; j++)
				{
					matrixL[i, j] = matrixA[i, j];
				}
			}
			for (int i = 0; i < Dimension; i++)
			{
				for (int j = i; j < Dimension; j++)
				{
					matrixU[i, j] = matrixA[i, j];
				}
			}

			Console.WriteLine("LU分解後");
			Console.WriteLine(nameof(matrixA));
			WriteMatrix(matrixA);
			// おまけ
			Console.WriteLine(nameof(matrixL));
			WriteMatrix(matrixL);
			Console.WriteLine(nameof(matrixU));
			WriteMatrix(matrixU);
			Console.WriteLine();

			// Ly = b
			// "matrixL"は"matrixA"と変えて同じ
			for (int i = 0; i < Dimension; i++)
			{
				var s = vectorB[i];
				for (int j = 0; j < i; j++)
				{
					s -= matrixL[i, j] * vectorY[j];
				}
				vectorY[i] = s; // vectorY[i] = s / matrixL[i,i]
			}

			Console.WriteLine("Ly = b の後");
			Console.WriteLine(nameof(vectorY));
			WriteVector(vectorY);
			Console.WriteLine();

			// Ux = y
			// "matrixU"は"matrixA"と変えて同じ
			for (int i = Dimension - 1; i >= 0; i--)
			{
				var s = vectorY[i];
				for (int j = i + 1; j < Dimension; j++)
				{
					s -= matrixU[i, j] * solutionX[j];
				}
				solutionX[i] = s / matrixU[i, i];
			}

			Console.WriteLine("Ux = y の後");
			Console.WriteLine("解");
			WriteVector(solutionX);
		}
	}
}
