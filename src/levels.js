import Brick from "/src/brick";

export const level1 = [
  //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  //[0, 1, 1, 0, 0, 0, 0, 1, 1, 0]
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0] // temp simple
];

export function buildLevel(game, level) {
  let bricks = [];

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      if (brick === 1) {
        bricks.push(new Brick(game, 25 + 75 * brickIndex, 200 + 25 * rowIndex));
      }
    });
  });
  return bricks;
}

export const level2 = [
  //[0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  //[0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  //[0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  //[0, 1, 1, 1, 1, 1, 1, 1, 1, 0]
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1] // temp test for side hits
];

export const level3 = [
  [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
];

export const level4 = [
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0]
];
