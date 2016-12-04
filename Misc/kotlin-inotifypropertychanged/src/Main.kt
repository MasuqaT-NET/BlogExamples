// -----------
//  ここからVM
// -----------
class MainViewModel : NotifyPropertyChanged {
    fun Test() {
        // do your complex job

        raisePropertyChanged("AnotherProperty")
    }

    var fullName: String by PropertyChangedDelegate("Hoge Taro")
}
// -----------
//  ここまでVM
// -----------

fun main(args: Array<String>) {
    val mainVm = MainViewModel()
    val subVm = object : NotifyPropertyChanged {
        var step: Int by PropertyChangedDelegate(9876)
    }

    mainVm.propertyChanged += { sender, e ->
        println("Notified ${e.propertyName} [$sender]")
    }
    mainVm.propertyChanged += { sender, e ->
        println("This is additional for ${e.propertyName}")
    }

    subVm.propertyChanged += { sender, e ->
        println("Notified ${e.propertyName} [$sender]")
    }

    mainVm.Test()

    println(mainVm.fullName)
    mainVm.fullName = "Piyo Jiro"
    println(mainVm.fullName)

    println(subVm.step)
    subVm.step = 12345
    println(subVm.step)
}