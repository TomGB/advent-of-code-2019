const from = 372037
const to = 905157

const allNumbers = Array.from({ length: to - from }, (_, i) => (i + from).toString().padStart(6, '0').split(''))

const ascendingNumbers = allNumbers.filter(digits =>
  digits[0] <= digits[1] &&
  digits[1] <= digits[2] &&
  digits[2] <= digits[3] &&
  digits[3] <= digits[4] &&
  digits[4] <= digits[5]
)

const numbersWithTwoTheSameInARow = ascendingNumbers.filter(digits =>
  digits[0] === digits[1] && digits[1] !== digits[2] ||
  digits[0] !== digits[1] && digits[1] === digits[2] && digits[2] !== digits[3]  ||
  digits[1] !== digits[2] && digits[2] === digits[3] && digits[3] !== digits[4]  ||
  digits[2] !== digits[3] && digits[3] === digits[4] && digits[4] !== digits[5]  ||
  digits[3] !== digits[4] && digits[4] === digits[5]
)

console.log(numbersWithTwoTheSameInARow.length)