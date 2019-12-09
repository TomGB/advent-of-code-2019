const machine = require('./7b.machine')
const instructions = require('./7b.data')

const numMachines = 5

const phasePermutations = Array.from(
    { length: Math.pow(numMachines, numMachines) },
    (_, i) => i.toString(numMachines).padStart(numMachines, '0')
).filter(
    phase => new Set(phase.split('')).size === numMachines
).map(phase => phase.split('').map(item => parseInt(item) + 5))

const outputs = phasePermutations.map(phaseInput => {
    const newLoop = (states) => {
        if (states[0] !== 'end') states[0] = machine(states[0].instructions, [states[4].output], states[0].pointer)
        if (states[1] !== 'end') states[1] = machine(states[1].instructions, [states[0].output], states[0].pointer)
        if (states[2] !== 'end') states[2] = machine(states[2].instructions, [states[1].output], states[0].pointer)
        if (states[3] !== 'end') states[3] = machine(states[3].instructions, [states[2].output], states[0].pointer)
        if (states[4] !== 'end') states[4] = machine(states[4].instructions, [states[3].output], states[0].pointer)
        if (states[4] === 'end') return states[4].output
    }

    const runLoop = () => {
        const machineStates = Array.from({ length: numMachines }, (_, i) => ({
            instructions,
            pointer: 0,
        }))
        machineStates[0] = machine(machineStates[0].instructions, [phaseInput[0], 0])
        machineStates[1] = machine(machineStates[1].instructions, [phaseInput[1], machineStates[0].output])
        machineStates[2] = machine(machineStates[2].instructions, [phaseInput[2], machineStates[1].output])
        machineStates[3] = machine(machineStates[3].instructions, [phaseInput[3], machineStates[2].output])
        machineStates[4] = machine(machineStates[4].instructions, [phaseInput[4], machineStates[3].output])

        return machineStates
    }

    const states = runLoop()

    let output = false

    do {
        output = newLoop(states)
    } while (!output)

    return output
})

console.log(JSON.stringify(outputs))
console.log(Math.max(...outputs))
