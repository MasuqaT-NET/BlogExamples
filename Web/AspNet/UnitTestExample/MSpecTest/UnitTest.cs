using Machine.Specifications;
using FluentAssertions;

namespace MSpecTest
{
	[Subject("MyTest")]
	[Tags("Sqrt2")]
	public class UnitTest
	{
		It should_be_equal = () =>
			WebApp.Startup.Id.Should().Be(141421356);
	}
}
