@Target(AnnotationTarget.VALUE_PARAMETER)
annotation class CallerMemberName

interface NotifyPropertyChanged {
    val propertyChanged: EventHandler<Any, PropertyChangedEventArgs>
        get() = eventHandlers.getOrPut(hashCode(), { EventHandler() })

    fun raisePropertyChanged(@CallerMemberName propertyName: String = "") {
        propertyChanged(this, PropertyChangedEventArgs(propertyName));
    }

    companion object {
        private val eventHandlers: MutableMap<Int, EventHandler<Any, PropertyChangedEventArgs>> = mutableMapOf()
    }
}