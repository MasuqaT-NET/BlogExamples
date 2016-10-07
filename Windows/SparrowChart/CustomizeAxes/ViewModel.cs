using System;
using System.Collections.Generic;
using System.Linq;

namespace CustomizeAxes
{
	public class ViewModel
	{
		public IEnumerable<Point> Points { get; } = Enumerable.Range(0, 10 + 1)
			.Select(x => new Point { X = x, Fx = Math.Pow(x, 0.5) });
	}

	public struct Point
	{
		public double X { get; set; }
		public double Fx { get; set; }
	}
}