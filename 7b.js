const machine = require('./7b.machine')
const instructions = require('./7b.data')

const numMachines = 5

const phasePermutations = Array.from(
    { length: Math.pow(numMachines, numMachines) },
    (_, i) => i.toString(numMachines).padStart(numMachines, '0')
).filter(
    phase => new Set(phase.split('')).size === numMachines
).map(phase => phase.split('').map(item => parseInt(item) + 5))

const newLoop = (states) => {
    // console.log(states)
    states[0] = machine(states[0].instructions, [states[4].output], states[0].pointer)
    states[1] = machine(states[1].instructions, [states[0].output], states[0].pointer)
    states[2] = machine(states[2].instructions, [states[1].output], states[0].pointer)
    states[3] = machine(states[3].instructions, [states[2].output], states[0].pointer)
    states[4] = machine(states[4].instructions, [states[3].output], states[0].pointer)
}

const runLoop = (phaseInput) => {
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

const states = runLoop([9,8,7,6,5])

console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))
console.log(newLoop(states))


// const outputs = phasePermutations.map(phaseInput => {

// })

// console.log(Math.max(...outputs))