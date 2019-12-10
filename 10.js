const input = `.###..#######..####..##...#
########.#.###...###.#....#
###..#...#######...#..####.
.##.#.....#....##.#.#.....#
###.#######.###..##......#.
#..###..###.##.#.#####....#
#.##..###....#####...##.##.
####.##..#...#####.#..###.#
#..#....####.####.###.#.###
#..#..#....###...#####..#..
##...####.######....#.####.
####.##...###.####..##....#
#.#..#.###.#.##.####..#...#
..##..##....#.#..##..#.#..#
##.##.#..######.#..#..####.
#.....#####.##........#####
###.#.#######..#.#.##..#..#
###...#..#.#..##.##..#####.
.##.#..#...#####.###.##.##.
...#.#.######.#####.#.####.
#..##..###...###.#.#..#.#.#
.#..#.#......#.###...###..#
#.##.#.#..#.#......#..#..##
.##.##.##.#...##.##.##.#..#
#.###.#.#...##..#####.###.#
#.####.#..#.#.##.######.#..
.#.#####.##...#...#.##...#.`.split('\n')

const locs = input.map((row, rowIndex) =>
  row.split('').map((item, colIndex) => ({ rowIndex, colIndex, item })).filter(({ item }) => item === '#')
).flat()

console.log(locs)

const remove = (arr, index) => {
  arr.splice(index, 1)
  return arr
}

const relations = locs.map((loc, index) => ({ loc, view: remove(locs.slice(), index) }))

console.log(JSON.stringify(relations))

const pointsWithAngles = relations.map(item =>
  item.view.map(({ rowIndex, colIndex }) => {
    const dX = rowIndex - item.loc.rowIndex
    const dY = colIndex - item.loc.colIndex
    return {
      angle: Math.atan2(dX, dY),
      distance: Math.sqrt(dX * dX + dY * dY)
    }
  })
)

const numVisible = pointsWithAngles.map(point =>
  new Set(point.map(({ angle }) => angle)).size
)

console.log(numVisible)

const maxNumVisible = Math.max(...numVisible)

console.log({ maxNumVisible })

console.log(locs[numVisible.indexOf(maxNumVisible)])
