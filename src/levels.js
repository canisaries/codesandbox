import Brick from "/src/brick";

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

const level1 = [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]];

const level2 = [
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
];

const level3 = [
  [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
  [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
  [1, 0, 1, 0, 1, 1, 0, 1, 0, 1]
];

const level4 = [
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 1, 1, 0, 1, 0, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 0, 0],
  [0, 1, 0, 1, 0, 1, 0, 0, 1, 0]
];

export const levelpack = [level1, level2, level3, level4];
