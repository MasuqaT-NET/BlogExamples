using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomizeLegend
{
	class ViewModel
	{
		public IEnumerable<Point> SqrtPoints { get; } = Enumerable.Range(0, 10 + 1)
			.Select(x => new Point { X = x, Fx = Math.Pow(x, 0.5) });
		public IEnumerable<Point> LnPoints { get; } = Enumerable.Range(1, 10)
			.Select(x => new Point { X = x, Fx = Math.Log(x) });
		public IEnumerable<Point> LinePoints { get; } = Enumerable.Range(0, 10 + 1)
			.Select(x => new Point { X = x, Fx = x / 2.0 - 1 });
	}

	public class Point
	{
		public double X { get; set; }
		public double Fx { get; set; }
	}
}
