import org.khronos.webgl.Float32Array
import kotlin.js.Math

data class Vector3(val x: Float, val y: Float, val z: Float) {
    operator fun plus(another: Vector3) = Vector3(x + another.x, y + another.y, z + another.z)
    operator fun minus(another: Vector3) = Vector3(x - another.x, y - another.y, z - another.z)
    operator fun unaryMinus() = Vector3(-x, -y, -z)
    operator fun div(another: Float) = Vector3(x / another, y / another, z / another)
    infix fun dot(another: Vector3) = x * another.x + y * another.y + z * another.z
    infix fun cross(another: Vector3) = Vector3(
            y * another.z - z * another.y,
            z * another.x - x * another.z,
            x * another.y - y * another.x
    )

    fun norm2(): Float {
        val x = this.x.toDouble()
        val y = this.y.toDouble()
        val z = this.z.toDouble()
        return Math.sqrt(x * x + y * y + z * z).toFloat()
    }
}

fun Array<Vector3>.toFloat32Array() = Float32Array(flatMap { listOf(it.x, it.y, it.z) }.toTypedArray())