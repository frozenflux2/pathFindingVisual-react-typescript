/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { DefaultValues } from "../constants";
import { IGrid } from "../interfaces";

export function randomWalls(grid: IGrid) {
  for (let row = 0; row < DefaultValues.DefaultRows; row++) {
    for (let col = 0; col < DefaultValues.DefaultColumns; col++) {
      let decider = Math.random();
      if (
        (decider <= 0.1 || decider >= 0.85) &&
        !grid.grid[row][col].isStart &&
        !grid.grid[row][col].isEnd
      ) {
        grid.toggleWall(row, col);
      }
    }
  }
}

export function recursiveDivision(grid: IGrid) {
  addInnerWalls(
    grid,
    true,
    1,
    DefaultValues.DefaultColumns - 2,
    1,
    DefaultValues.DefaultRows - 2
  );
  addOuterWalls(grid, DefaultValues.DefaultColumns, DefaultValues.DefaultRows);
}

function addOuterWalls(grid: IGrid, width: number, height: number) {
  for (var i = 0; i < height; i++) {
    if (i === 0 || i === height - 1) {
      for (var j = 0; j < width; j++) {
        if (!grid.grid[i][j].isWall) grid.toggleWall(i, j);
      }
    } else {
      if (!grid.grid[i][0].isWall) grid.toggleWall(i, 0);
      if (!grid.grid[i][width - 1].isWall) grid.toggleWall(i, width - 1);
    }
  }
}

function addInnerWalls(
  grid: IGrid,
  h: boolean,
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
) {
  if (h) {
    if (maxX - minX < 2) {
      return;
    }

    var y = Math.floor(randomNumber(minY, maxY) / 2) * 2;
    addHWall(grid, minX, maxX, y);

    addInnerWalls(grid, !h, minX, maxX, minY, y - 1);
    addInnerWalls(grid, !h, minX, maxX, y + 1, maxY);
  } else {
    if (maxY - minY < 2) {
      return;
    }

    var x = Math.floor(randomNumber(minX, maxX) / 2) * 2;
    addVWall(grid, minY, maxY, x);

    addInnerWalls(grid, !h, minX, x - 1, minY, maxY);
    addInnerWalls(grid, !h, x + 1, maxX, minY, maxY);
  }
}

function addHWall(grid: IGrid, minX: number, maxX: number, y: number) {
  var hole = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  var hole2 = Math.floor(randomNumber(minX, maxX) / 2) * 2 + 1;
  for (var i = minX; i <= maxX; i++) {
    if (i === hole || i === hole2) continue;
    grid.toggleWall(y, i);
  }
}

function addVWall(grid: IGrid, minY: number, maxY: number, x: number) {
  var hole = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  var hole2 = Math.floor(randomNumber(minY, maxY) / 2) * 2 + 1;
  for (var i = minY; i <= maxY; i++) {
    if (i === hole || i === hole2) continue;
    grid.toggleWall(i, x);
  }
}

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
