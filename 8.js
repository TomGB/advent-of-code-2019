const input = require('./8.data')

const width = 25
const height = 6

const length = input.length / (width * height)

const output = Array.from({ length }, (_, layerIndex) =>
  Array.from({ length: width * height }, (_, positionIndex) =>
    input[layerIndex * (width * height) + positionIndex]
  )
)

const zeroCounts = output.map(layer => layer.reduce((count, item) => item === '0' ? count + 1 : count, 0))

const layerWithLeastZeros = zeroCounts.indexOf(Math.min(...zeroCounts))

console.log({ layerWithLeastZeros })

const countTwos = output[layerWithLeastZeros].filter(item => item === '2').length
const countOnes = output[layerWithLeastZeros].filter(item => item === '1').length

console.log({ countTwos, countOnes })

console.log(countTwos * countOnes)
