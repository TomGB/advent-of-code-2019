const input = require('./6.data')
const instructions = input.split('\n').map(line => line.split(')'))

const planets = { 'COM': 0 }

let toFind = ['COM']

do {
    const orbits = toFind.reduce((acc, planet) => [...acc, ...instructions.filter(([p1]) => p1 === planet)], [])
    console.log(orbits)
    toFind = []
    orbits.forEach((([p1, p2]) => {
        planets[p2] = planets[p1] + 1
        toFind.push(p2)
    }))

} while(Object.keys(planets).length < instructions.length + 1)

console.log(Object.values(planets).reduce((a, b) => a + b, 0))
