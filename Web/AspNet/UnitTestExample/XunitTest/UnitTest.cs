using Xunit;

namespace XunitTest
{
	public class UnitTest
	{
		[Fact, Trait("Category", "Sqrt2")]
		public void MyTestMethod()
		{
			Assert.Equal(WebApp.Startup.Id, 141421356);
		}
	}
}
