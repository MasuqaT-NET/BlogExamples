fun main(args: Array<String>) {
    val array = arrayOf(50, 60, 70, 70, 100)
    val mean = array.run { sum() / count().toDouble() }
    val variance = array.run { map { it * it }.run { sum() / count().toDouble() } - mean * mean }
    println(variance)
}