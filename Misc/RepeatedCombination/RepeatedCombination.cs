using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RepeatedCombination
{
	public class RepeatedCombination
	{
		public static void Main(string[] args)
		{
			foreach (var n in Generate(new[] { 0, 1, 2 }, 3))
			{
				Console.WriteLine(string.Concat(n));
			}
		}

		static IEnumerable<IEnumerable<T>> Generate<T>(IEnumerable<T> elements, int n) => Generate<T>(elements, n, Enumerable.Empty<T>());

		static IEnumerable<IEnumerable<T>> Generate<T>(IEnumerable<T> elements, int n, IEnumerable<T> elementBase)
		{
			if (elementBase.Count() >= n)
			{
				yield return elementBase;
				yield break;
			}

			foreach (var e in elements)
			{
				foreach (var item in Generate(elements, n, new List<T>(elementBase) { e }))
				{
					yield return item;
				}
			}
		}
	}
}
