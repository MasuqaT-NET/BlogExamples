open class EventArgs

class PropertyChangedEventArgs(val propertyName: String = "") : EventArgs()

class EventHandler<TObj, TArg : EventArgs> {
    private val handlers = arrayListOf<(EventHandler<TObj, TArg>.(TObj, TArg) -> Unit)>()

    operator fun plusAssign(handler: EventHandler<TObj, TArg>.(TObj, TArg) -> Unit) {
        handlers.add(handler);
    }

    operator fun invoke(sender: TObj, e: TArg) {
        for (handler in handlers) {
            handler(sender, e)
        }
    }
}

// public typeAlias PropertyChangedEventHandler = EventHandler<Any, PropertyChangedEventArgs>