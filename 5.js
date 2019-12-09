var readline = require('readline-sync');

const inputData = require('./5.data.js')

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
        return  pointer + 4
    },
    3: ({ param1, instructions, pointer }) => {
        instructions[param1] = parseInt(readline.question("Input: "))
        return  pointer + 2
    },
    4: ({ param1, instructions, pointer }) => {
        console.log(instructions[param1])
        return  pointer + 2
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
    let pointer = 0
    do {
        [command, param1, param2, param3] = instructions.slice(pointer, pointer + 4)

        if (command == 99) return

        // console.log({ instructions, pointer })

        const {
            paramMode,
            opCode
        } = getParameterMode(command)

        pointer = commands[parseInt(opCode)]({ param1, param2, param3, instructions, paramMode, pointer })
    } while (pointer < instructions.length)
}

program(inputData)
