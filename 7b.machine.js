const machine = (inputData, input, pointer = 0) => {
    let inputIndex = 0

    const twoParams = ({ param1, param2, paramMode, instructions }) => {
        const inputA = paramMode[0] ? param1 : instructions[param1]
        const inputB = paramMode[1] ? param2 : instructions[param2]

        return { inputA, inputB }
    }

    const commands = {
        1: ({ param1, param2, param3, paramMode, instructions, pointer }) => {
            const { inputA, inputB } = twoParams({ param1, param2, param3, paramMode, instructions })

            instructions[param3] = inputA + inputB
            return pointer + 4
        },
        2: ({ param1, param2, param3, paramMode, instructions, pointer }) => {
            const { inputA, inputB } = twoParams({ param1, param2, paramMode, instructions })

            instructions[param3] = inputA * inputB
            return pointer + 4
        },
        3: ({ param1, instructions, pointer }) => {
            instructions[param1] = parseInt(input[inputIndex])
            inputIndex++
            return pointer + 2
        },
        4: ({ param1, instructions, pointer }) => {
            return  { pointer: pointer + 2, output: instructions[param1], instructions }
        },
        5: ({ param1, param2, pointer, paramMode, instructions }) => {
            const { inputA, inputB } = twoParams({ param1, param2, paramMode, instructions })
            return inputA ? inputB : pointer + 3
        },
        6: ({ param1, param2, pointer, paramMode, instructions }) => {
            const { inputA, inputB } = twoParams({ param1, param2, paramMode, instructions })
            return inputA ? pointer + 3 : inputB
        },
        7: ({ param1, param2, param3, instructions, pointer, paramMode }) => {
            const { inputA, inputB } = twoParams({ param1, param2, paramMode, instructions })
            instructions[param3] = inputA < inputB ? 1 : 0
            return pointer + 4
        },
        8: ({ param1, param2, param3, instructions, pointer, paramMode }) => {
            const { inputA, inputB } = twoParams({ param1, param2, paramMode, instructions })
            instructions[param3] = inputA === inputB ? 1 : 0
            return pointer + 4
        }
    }

    const getParameterMode = (command) => {
        const [paramMode3, paramMode2, paramMode1, opCodePart1, opCodePart2] = command.toString().padStart(5,'0').split('')
        const opCode = opCodePart1 + opCodePart2

        return {
            paramMode: [parseInt(paramMode1), parseInt(paramMode2), parseInt(paramMode3)],
            opCode: parseInt(opCode)
        }
    }

    const program = (instructions) => {
        let outcome
        do {
            [command, param1, param2, param3] = instructions.slice(pointer, pointer + 4)

            if (command == 99) return 'end'

            const {
                paramMode,
                opCode
            } = getParameterMode(command)

            outcome = commands[parseInt(opCode)]({ param1, param2, param3, instructions, paramMode, pointer })

            if (typeof outcome !== 'number') {
                return outcome
            }

            pointer = outcome

        } while (pointer < instructions.length)
    }

    try {
        return program(inputData.slice())
    } catch (e) {
        return {}
    }
}

module.exports = machine
