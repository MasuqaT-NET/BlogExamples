import java.util.*

typealias Brace = () -> Unit

enum class Instruction {
    NONE,
    POINTER_INCREMENT,
    POINTER_DECREMENT,
    VALUE_INCREMENT,
    VALUE_DECREMENT,
    OUTPUT,
    INPUT,
    LOOP_START,
    LOOP_END
}

class Memory(initData: () -> Array<Byte>) {
    private val data: MutableList<Byte> by lazy {
        initData().toMutableList()
    }

    private val inputScanner = Scanner(System.`in`)
    var pointer = 0
        private set

    fun pointerIncrement() {
        pointer++
        if (pointer >= data.size) {
            throw IndexOutOfBoundsException()
        }
    }

    fun pointerDecrement() {
        pointer--
        if (pointer < 0) {
            throw IndexOutOfBoundsException()
        }
    }

    fun valueIncrement() {
        data[pointer]++
    }

    fun valueDecrement() {
        data[pointer]--
    }

    fun output() {
        print(data[pointer].toChar())
    }

    fun input() {
        data[pointer] = inputScanner.next().first().toByte()
    }

    fun checkIfZero() = data[pointer].compareTo(0) == 0
}

class InstructionStack(initStack: Array<Instruction>) {
    private val stack: MutableList<Instruction> = initStack.toMutableList()
    val rawStack: List<Instruction>
        get() = stack

    fun push(instruction: Instruction) {
        stack.add(instruction)
    }
}

data class WholeState(val memory: Memory, val stack: InstructionStack)

class BracketsOok(private val state: WholeState) {
    private var syntaxState: SyntaxState = Root(Instruction.NONE)

    operator fun invoke(): BracketsOok {
        val s = syntaxState.contains0()
        if (s is Root) {
            state.stack.push(s.instruction)
        }
        syntaxState = s
        return this
    }

    operator fun invoke(_b: Brace): BracketsOok {
        val s = syntaxState.contains1()
        if (s is Root) {
            state.stack.push(s.instruction)
        }
        syntaxState = s
        return this
    }

    operator fun invoke(_b2: Brace2): BracketsOok {
        val s = syntaxState.contains2()
        if (s is Root) {
            state.stack.push(s.instruction)
        }
        syntaxState = s
        return this
    }

    operator fun invoke(_bf: BracketsOok) {
        interpret()
    }

    private fun interpret() {
        val stack = state.stack.rawStack

        var pos = 0
        while (pos < stack.size) {
            when (stack[pos]) {
                Instruction.POINTER_INCREMENT -> state.memory.pointerIncrement()
                Instruction.POINTER_DECREMENT -> state.memory.pointerDecrement()
                Instruction.VALUE_INCREMENT -> state.memory.valueIncrement()
                Instruction.VALUE_DECREMENT -> state.memory.valueDecrement()
                Instruction.OUTPUT -> state.memory.output()
                Instruction.INPUT -> state.memory.input()
                Instruction.LOOP_START -> {
                    if (state.memory.checkIfZero()) {
                        var depth = 1
                        while (depth > 0) {
                            pos++
                            when (stack[pos]) {
                                Instruction.LOOP_START -> depth++
                                Instruction.LOOP_END -> depth--
                                else -> Unit
                            }
                        }
                    }
                }
                Instruction.LOOP_END -> {
                    var depth = 1
                    while (depth > 0) {
                        pos--
                        when (stack[pos]) {
                            Instruction.LOOP_START -> depth--
                            Instruction.LOOP_END -> depth++
                            else -> Unit
                        }
                    }
                    pos--
                }
                Instruction.NONE -> Unit
            }
            pos++
        }
    }

    private interface SyntaxState {
        fun contains0(): SyntaxState // Ook.
        fun contains1(): SyntaxState // Ook?
        fun contains2(): SyntaxState // Ook!
    }

    private data class Root(val instruction: Instruction) : SyntaxState {
        override fun contains0(): SyntaxState = Dot

        override fun contains1(): SyntaxState = Question

        override fun contains2(): SyntaxState = Exclamation

        object Dot : SyntaxState {
            // + : Increment the memory cell under the pointer
            override fun contains0(): SyntaxState = Root(Instruction.VALUE_INCREMENT)

            // > : Move the pointer to the right
            override fun contains1(): SyntaxState = Root(Instruction.POINTER_INCREMENT)

            // , : Input a character and store it in the cell at the pointer
            override fun contains2(): SyntaxState = Root(Instruction.INPUT)
        }

        object Question : SyntaxState {
            // < : Move the pointer to the left
            override fun contains0(): SyntaxState = Root(Instruction.POINTER_DECREMENT)

            // N/A
            override fun contains1(): SyntaxState = throw IllegalStateException()

            // ] : Jump back to the matching `({}{})({})`
            override fun contains2(): SyntaxState = Root(Instruction.LOOP_END)
        }

        object Exclamation : SyntaxState {
            // . : Output the character signified by the cell at the pointer
            override fun contains0(): SyntaxState = Root(Instruction.OUTPUT)

            // [ : Jump past the matching `({})({}{})` if the cell under the pointer is 0
            override fun contains1(): SyntaxState = Root(Instruction.LOOP_START)

            // - : Decrement the memory cell under the pointer
            override fun contains2(): SyntaxState = Root(Instruction.VALUE_DECREMENT)
        }
    }
}

object Brace2 {
    operator fun invoke(_b: Brace) = BracketsOok(WholeState(Memory({ Array<Byte>(30000, { 0 }) }), InstructionStack(emptyArray())))
}

operator fun Brace.invoke(_b: Brace) = Brace2

fun main(args: Array<String>): Unit {
    // echo character 1 by 1
    // (({}{}){})()({}{})({}{})({})({}{})()({}{})({})({}{})({}{})({})({}{})()({}{})({})({}{})(({}{}){})

    // Hello World ([Internal Error] KotlinFrontEndException) on compile
    // (({}{}){})()({})()()()()()()()()()()()()()()()()()()({}{})({})({})()()()()()()()()()()()()()()()()()()({})({}{})({}{})({})({}{})({})()({}{})()()({})()()()()()()()()()()()()()()({}{})({})({})()()()()()()()()()()({})({}{})({}{})({})({}{})({})()()()({}{})()()()()()()()()()()()()()()()({}{})()({}{})()()()()()()()({}{})()()({})()({})()({})()()()()()()()()()()()()()()()()({}{})({})({})()()()()()()()()()()({})({}{})({}{})({})({}{})({})()({}{})()()({})()({})()({})()()()()()()()()()()()()()()()()()()()()({}{})({})({})()()()()()()()()()()()()()()()()()()()()({})({}{})({}{})({})({}{})({})()({}{})({}{})({}{})({}{})({}{})({}{})({}{})()({})()({})()({})()({})()({}{})()()()()()()()({}{})()({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})()({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})()()({})()({})()()({}{})(({}{}){})

    // Kotlin!
    (({}{}){})({}{})({}{})({}{})({})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})()({})()()({})()({})({}{})()({})()()()()({}{})()({}{})({}{})({}{})({})({}{})({}{})({}{})({}{})()({})()()()()()()({})()({})({}{})()({})({}{})()()()()()()()()()()()({}{})()({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})({}{})()({}{})({}{})({}{})({}{})({}{})({}{})({}{})()()()()()()()()()()()({}{})()({}{})({}{})({}{})({})({}{})({}{})()({})()()()()()()()()()()({})()({})({}{})()({})({}{})()(({}{}){})
}