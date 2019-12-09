const machine = require('./7.machine.js')
const code = require('./7.data')

const numMachines = 5

const phasePermutations = Array.from(
    { length: Math.pow(numMachines, numMachines) },
    (_, i) => i.toString(numMachines).padStart(numMachines, '0')
).filter(phase => new Set(phase.split('')).size === numMachines)

const outputs = phasePermutations.map(phaseInput => 
    Array.from({ length: numMachines }).reduce((lastInput, _, machineIndex) =>
        machine(code, [phaseInput[machineIndex], lastInput]),
        0
    )
)

console.log(Math.max(...outputs))