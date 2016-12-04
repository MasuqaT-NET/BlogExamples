import kotlin.reflect.KProperty

class PropertyChangedDelegate<T>(initalValue: T) {
    private var value: T = initalValue

    operator fun getValue(thisRef: NotifyPropertyChanged, property: KProperty<*>): T {
        return value
    }

    operator fun setValue(thisRef: NotifyPropertyChanged, property: KProperty<*>, value: T) {
        this.value = value

        thisRef.raisePropertyChanged(property.name)
    }
}