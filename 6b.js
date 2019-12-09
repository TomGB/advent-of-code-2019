const input = require('./6.data')
const instructions = input.split('\n').map(line => line.split(')'))

const planets = { 'COM': [] }

let toFind = ['COM']

do {
    const orbits = toFind.reduce((acc, planet) => [...acc, ...instructions.filter(([p1]) => p1 === planet)], [])
    toFind = []
    orbits.forEach((([p1, p2]) => {
        planets[p2] = [...planets[p1], p1]
        toFind.push(p2)
    }))

} while(Object.keys(planets).length < instructions.length + 1)

const myPath = planets['YOU'].slice().reverse()
const santaPath = planets['SAN'].slice().reverse()

myPath.find((planet, i) => {
    const foundIndex = santaPath.findIndex(santaPlanet => planet === santaPlanet)
    if (foundIndex === -1) return
    console.log(foundIndex + i)
    return true
})

