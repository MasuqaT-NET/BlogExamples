fun main(args: Array<String>) {
    val array = arrayOf(50.0, 60.0, 70.0, 70.0, 100.0)
    val mean = array.run { sum() / count() }
    val variance = array.run {
        map { it * it }.run { sum() / count() } - ( sum() / count()) * ( sum() / count())
    }
    
    println("mean: $mean, variance: $variance")
}