const data = require('./1.data.js')

const output = data.reduce((acc, item) => {
    const start = Math.floor(item / 3) - 2

    let total = start
    let additionalFuel = start

    do {
        additionalFuel = Math.floor(additionalFuel / 3) - 2
        if (additionalFuel > 0) total += additionalFuel
    } while (additionalFuel > 0)

    return acc + total
}, 0)

console.log(output)