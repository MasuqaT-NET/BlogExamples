using ReactiveUI;
using System;
using System.Linq;
using System.Reactive.Linq;

namespace ByReactiveUI
{
	class ReactiveUIViewModel : ReactiveObject
	{
		private string text = "InitValue";
		public string Text
		{
			get
			{
				return text;
			}
			set
			{
				this.RaiseAndSetIfChanged(ref text, value);
			}
		}

		public ObservableAsPropertyHelper<string> LabelText { get; }

		public ObservableAsPropertyHelper<string> ButtonText { get; }

		public ReactiveCommand<object> ButtonCommand { get; }

		public ReactiveList<string> LogList { get; } = new ReactiveList<string> { "First" };

		public ReactiveUIViewModel()
		{
			var textObservable = this.WhenAnyValue(x => x.Text);
			LabelText = new ObservableAsPropertyHelper<string>(textObservable.Select(x => string.Concat(x.ToUpper().Reverse())), x => this.RaisePropertyChanged(nameof(LabelText)), x => { });
			ButtonText = new ObservableAsPropertyHelper<string>(textObservable.Throttle(TimeSpan.FromSeconds(2.0)), x => this.RaisePropertyChanged(nameof(ButtonText)), "Hello");

			ButtonCommand = ReactiveCommand.Create(this.WhenAny(x => x.Text, x => x.Value.Length > 10));
			ButtonCommand.Subscribe(_ => LogList.Add($"Button pressed. @{Text}"));
		}
	}
}
