using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Data;

namespace CustomizeAxes
{
	class RomanConverter : IValueConverter
	{
		string GetNumberInRoman(int number)
		{
			if (number < 1 || 10 < number)
			{
				if (number == 0)
				{
					return "〇";
				}
				throw new ArgumentOutOfRangeException(nameof(number));
			}

			// "Ⅰ" = { 226, 133, 160 }
			return Encoding.UTF8.GetString(new byte[] { 226, 133, (byte)(160 + number - 1) });
		}

		public object Convert(object value, Type targetType, object parameter, CultureInfo culture)
		{
			var v = int.Parse(value as string);
			return GetNumberInRoman(v);
		}

		public object ConvertBack(object value, Type targetType, object parameter, CultureInfo culture)
		{
			throw new NotImplementedException();
		}
	}
}
