fun main(args: Array<String>) {
    val array = arrayOf(50, 60, 70, 70, 100)
    val variance = array.run { map { it * it }.average() - average() * average() }
    println(variance)
}