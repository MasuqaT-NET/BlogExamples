using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;

namespace Linq2XmlWithEntity
{
	public class Linq2XmlWithEntity
	{
		public static void Main(string[] args)
		{
			// Console.WriteLine("何も処置しない場合");
			// InvalidProcess();
			// Console.WriteLine();

			Console.WriteLine("ネットから取得");
			OnlineProcess();
			Console.WriteLine();

			Console.WriteLine("ローカルから取得");
			LocalProcess();
			Console.WriteLine();
		}

		static void InvalidProcess()
		{
			var doc = XElement.Load("Formula.xml");
			Console.WriteLine(doc.ToString());
		}

		static void OnlineProcess()
		{
			var start = DateTime.Now;
			var setting = new XmlReaderSettings { };
			var doc = XDocument.Load(XmlReader.Create("Formula.xml", setting));
			Console.WriteLine(DateTime.Now - start);
			Console.WriteLine(doc.ToString());
			throw new NotImplementedException();
		}

		static void LocalProcess()
		{
			var start = DateTime.Now;
			var setting = new XmlReaderSettings { };
			var doc = XDocument.Load(XmlReader.Create("Formula.xml", setting));
			Console.WriteLine(DateTime.Now - start);
			Console.WriteLine(doc.ToString());
			throw new NotImplementedException();
		}
	}
}
