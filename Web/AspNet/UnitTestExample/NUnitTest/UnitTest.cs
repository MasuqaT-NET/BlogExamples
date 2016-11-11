using NUnit.Framework;

namespace NUnitTest
{
	[TestFixture]
	public class UnitTest
	{
		[Test, Category("Sqrt2")]
		public void MyTestMethod()
		{
			Assert.AreEqual(WebApp.Startup.Id, 141421356);
		}
	}
}
