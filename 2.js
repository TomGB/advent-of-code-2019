const inputData = require('./2.data.js')

const commands = {
    1: (a, b) => a + b,
    2: (a, b) => a * b,
    99: 'end'
}

const program = (instructions) => {
    for (let p = 0; p < instructions.length; p += 4) {
        [command, locA, locB, locOut] = instructions.slice(p, p + 4)

        const action = commands[command]

        if (action == 'end') return instructions[0]
    
        instructions[locOut] = action(instructions[locA], instructions[locB])
    }
}

const findMatch = (input, match) => {
    for (let a = 0; a < 99; a += 1) {
        for (let b = 0; b < 99; b += 1) {
            const newInput = [...input]
            newInput[1] = a
            newInput[2] = b
    
            if (program(newInput) === match) return 100 * a + b
        }
    }
}

console.log(findMatch(inputData, 19690720))
