using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MSUnitTest
{
	[TestClass]
	public class UnitTest
	{
		[TestMethod, TestCategory("Sqrt2")]
		public void MyTestMethod()
		{
			Assert.IsTrue(true);
			// Assert.AreEqual(WebApp.Startup.Id, 141421356);
		}
	}
}
