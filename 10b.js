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

// console.log(locs)

const remove = (arr, index) => {
  arr.splice(index, 1)
  return arr
}

const relations = locs.map((loc, index) => ({ loc, view: remove(locs.slice(), index) }))


const station = {
  loc: {
    rowIndex: 23,
    colIndex: 27,
  }
}

const pointsWithAngles = relations.map(point => {
  const angles = point.view.map(({ rowIndex, colIndex }) => {
    const dX = rowIndex - point.loc.rowIndex
    const dY = colIndex - point.loc.colIndex
    return {
      angle: Math.atan2(dX, dY),
      distance: Math.sqrt(dX * dX + dY * dY)
    }
  })
  return {
    point,
    angles
  }
})

const stationsWithNumVisible = pointsWithAngles.map(point => ({
  visible: new Set(point.angles.map(({ angle }) => angle)).size,
  point,
}))

const numVisible = stationsWithNumVisible.map(({ visible }) => visible)

const maxVisibleIndex = numVisible.indexOf(Math.max(...numVisible))

console.log(stationsWithNumVisible[maxVisibleIndex].point)

// console.log(locs[numVisible.indexOf(maxNumVisible)])
