using Reactive.Bindings;
using System;
using System.Linq;
using System.Reactive.Linq;

namespace ByReactiveProperty
{
	class ReactivePropertyViewModel
	{
		public ReactiveProperty<string> Text { get; } = new ReactiveProperty<string>("InitValue");

		public ReactiveProperty<string> LabelText { get; }

		public ReactiveProperty<string> ButtonText { get; }

		public ReactiveCommand ButtonCommand { get; }

		public ReactiveCollection<string> LogList { get; } = new ReactiveCollection<string> { "First" };

		public ReactivePropertyViewModel()
		{
			LabelText = Text.Select(x => string.Concat(x.ToUpper().Reverse())).ToReactiveProperty();
			ButtonText = Text.Throttle(TimeSpan.FromSeconds(2.0)).ToReactiveProperty("Hello");

			ButtonCommand = Text.Select(x => x.Length > 10).ToReactiveCommand();
			ButtonCommand.Subscribe(_ => LogList.Add($"Button pressed. @{Text.Value}"));
		}
	}
}
