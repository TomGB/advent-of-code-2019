const input = require('./6.data')
x = 0
while(x < 1000) {

const instructions = input.split('\n').map(line => line.split(')'))

const planets = { 'COM': 0 }

instructions.forEach(([p1, p2]) => planets[p2] = planets[p1] + 1)

console.log(Object.values(planets).reduce((a, b) => a + b, 0))

x++
}