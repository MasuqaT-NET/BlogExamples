import org.khronos.webgl.*
import org.khronos.webgl.WebGLRenderingContext.Companion as WebGLConstant
import org.w3c.dom.HTMLCanvasElement
import org.w3c.dom.HTMLScriptElement
import kotlin.browser.document

fun run() {
    val context = (document.getElementById("canvas") as HTMLCanvasElement).apply {
        width = 300
        height = 300
    }

    val gl = (context.getContext("webgl") ?: context.getContext("experimental-webgl")) as WebGLRenderingContext

    gl.clearColor(0.0f, 0.0f, 0.0f, 1.0f)
    gl.clear(WebGLConstant.COLOR_BUFFER_BIT)

    val vShader = createShader(gl, "vs")
    val fShader = createShader(gl, "fs")
    val program = createShaderProgram(gl, vShader, fShader)
    val attLocation = gl.getAttribLocation(program, "position")
    val attStride = 3

    val vertexPositions = arrayOf(
            Vector3(0.0f, 1.0f, 0.0f),
            Vector3(1.0f, 0.0f, 0.0f),
            Vector3(-1.0f, 0.0f, 0.0f)
    )
    val vbo = createVbo(gl, vertexPositions.toFloat32Array())
    gl.bindBuffer(WebGLConstant.ARRAY_BUFFER, vbo)
    gl.enableVertexAttribArray(attLocation)
    gl.vertexAttribPointer(attLocation, attStride, WebGLConstant.FLOAT, false, 0, 0)

    val mMatrix = Matrix4x4.itentity
    val vMatrix = Matrix4x4.lookAt(
            Vector3(0.0f, 1.0f, 3.0f),
            Vector3(0.0f, 0.0f, 0.0f),
            Vector3(0.0f, 1.0f, 0.0f)
    )
    val pMatrix = Matrix4x4.perspective(90.0f, context.width.toFloat() / context.height.toFloat(), 0.1f, 100.0f)
    val mvpMatrix = pMatrix * vMatrix * mMatrix

    val uniLocation = gl.getUniformLocation(program, "mvpMatrix")
    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix.toFloat32Array())

    gl.drawArrays(WebGLConstant.TRIANGLES, 0, 3)
    gl.flush()
}

private fun createVbo(gl: WebGLRenderingContext, data: Float32Array): WebGLBuffer {
    val vbo = gl.createBuffer()
    gl.bindBuffer(WebGLConstant.ARRAY_BUFFER, vbo)
    gl.bufferData(WebGLConstant.ARRAY_BUFFER, data, WebGLConstant.STATIC_DRAW)
    gl.bindBuffer(WebGLConstant.ARRAY_BUFFER, null)
    return vbo!!
}

private fun createShaderProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader): WebGLProgram {
    val program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (gl.getProgramParameter(program, WebGLConstant.LINK_STATUS) as Boolean) {
        gl.useProgram(program)
        return program!!
    } else {
        throw IllegalStateException("Shader program is not compiled.")
    }
}

private fun createShader(gl: WebGLRenderingContext, id: String): WebGLShader {
    val element = document.getElementById(id) as HTMLScriptElement

    val shader = when (element.type) {
        "x-shader/x-vertex" -> gl.createShader(WebGLConstant.VERTEX_SHADER)
        "x-shader/x-fragment" -> gl.createShader(WebGLConstant.FRAGMENT_SHADER)
        else -> throw NoSuchElementException("${element.type} is invalid.")
    }

    gl.shaderSource(shader, element.text)
    gl.compileShader(shader)

    if (gl.getShaderParameter(shader, WebGLConstant.COMPILE_STATUS) as Boolean) {
        return shader!!
    } else {
        throw IllegalStateException("${element.type} shader is not compiled.")
    }
}