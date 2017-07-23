import org.khronos.webgl.Float32Array
import kotlin.js.Math

data class Matrix4x4(val x11: Float, val x12: Float, val x13: Float, val x14: Float,
                     val x21: Float, val x22: Float, val x23: Float, val x24: Float,
                     val x31: Float, val x32: Float, val x33: Float, val x34: Float,
                     val x41: Float, val x42: Float, val x43: Float, val x44: Float) {
    operator fun times(another: Matrix4x4) = Matrix4x4(
            x11 * another.x11 + x12 * another.x21 + x13 * another.x31 + x14 * another.x41, x11 * another.x12 + x12 * another.x22 + x13 * another.x32 + x14 * another.x42, x11 * another.x13 + x12 * another.x23 + x13 * another.x33 + x14 * another.x43, x11 * another.x14 + x12 * another.x24 + x13 * another.x34 + x14 * another.x44,
            x21 * another.x11 + x22 * another.x21 + x23 * another.x31 + x24 * another.x41, x21 * another.x12 + x22 * another.x22 + x23 * another.x32 + x24 * another.x42, x21 * another.x13 + x22 * another.x23 + x23 * another.x33 + x24 * another.x43, x21 * another.x14 + x22 * another.x24 + x23 * another.x34 + x24 * another.x44,
            x31 * another.x11 + x32 * another.x21 + x33 * another.x31 + x34 * another.x41, x31 * another.x12 + x32 * another.x22 + x33 * another.x32 + x34 * another.x42, x31 * another.x13 + x32 * another.x23 + x33 * another.x33 + x34 * another.x43, x31 * another.x14 + x32 * another.x24 + x33 * another.x34 + x34 * another.x44,
            x41 * another.x11 + x42 * another.x21 + x43 * another.x31 + x44 * another.x41, x41 * another.x12 + x42 * another.x22 + x43 * another.x32 + x44 * another.x42, x41 * another.x13 + x42 * another.x23 + x43 * another.x33 + x44 * another.x43, x41 * another.x14 + x42 * another.x24 + x43 * another.x34 + x44 * another.x44
    )

    fun toFloat32Array() = Float32Array(arrayOf(x11, x21, x31, x41, x12, x22, x32, x42, x13, x23, x33, x43, x14, x24, x34, x44))

    companion object {
        fun lookAt(eye: Vector3, target: Vector3, up: Vector3): Matrix4x4 {
            val z = (eye - target).run { this / this.norm2() }
            val x = (up cross z).run { this / this.norm2() }
            val y = z cross x

            val transpose = -Vector3(eye dot x, eye dot y, eye dot z)

            return Matrix4x4(
                    x.x, x.y, x.z, transpose.x,
                    y.x, y.y, y.z, transpose.y,
                    z.x, z.y, z.z, transpose.z,
                    0.0f, 0.0f, 0.0f, 1.0f
            )
        }

        fun perspective(fovY: Float, aspect: Float, near: Float, far: Float): Matrix4x4 {
            val t = near * Math.tan(fovY * Math.PI / 360.0f).toFloat()
            val r = t * aspect
            val a = r * 2.0f
            val b = t * 2.0f
            val c = far - near

            return Matrix4x4(
                    near * 2.0f / a, 0.0f, 0.0f, 0.0f,
                    0.0f, near * 2.0f / b, 0.0f, 0.0f,
                    0.0f, 0.0f, -(far + near) / c, -(far * near * 2.0f) / c,
                    0.0f, 0.0f, -1.0f, 0.0f
            )
        }

        val itentity = Matrix4x4(
                1.0f, 0.0f, 0.0f, 0.0f,
                0.0f, 1.0f, 0.0f, 0.0f,
                0.0f, 0.0f, 1.0f, 0.0f,
                0.0f, 0.0f, 0.0f, 1.0f
        )
    }
}