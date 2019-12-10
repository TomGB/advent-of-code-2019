const input = require('./8.data')

const pixelMap = [' ', 'X']

const width = 25
const height = 6

const length = input.length / (width * height)

const pixels = Array.from({ length: width * height }, (_, positionIndex) =>
  pixelMap[
    Array.from({ length }, (_, layerIndex) =>
      input[layerIndex * (width * height) + positionIndex]
    ).find(pixel => ['0', '1'].includes(pixel))
  ]
)

// const print = pixels.map((pixel, index) => (!(index % width) ? '\n' : '') + pixel).join('')
const splitLines = new RegExp(`.{${width}}`, 'g')
const print = pixels.join('').match(splitLines).join('\n')
console.log(print)
// str.match(/.{150}/g)
