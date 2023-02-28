/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { DefaultValues } from "./constants";
import { IGrid, INodeProperties } from "./interfaces";

export default class Grid implements IGrid {
  grid: Array<Array<INodeProperties>>;
  constructor(weighted: boolean, start: Array<number>, end: Array<number>) {
    this.grid = [];
  }

  initializeNode(
    row: number,
    col: number,
    weighted: boolean,
    start: Array<number>,
    end: Array<number>
  ): INodeProperties {
    let weight = 0;
    if (weighted) {
      weight = Math.floor(Math.random() * 9) + 1;
    }
    return {
      col,
      row,
      isEnd: row === end[0] && col === end[1],
      isStart: row === start[0] && col === start[1],
      isVisited: false,
      isWall: false,
      distance: Infinity,
      previous: null,
      weight: weight,
    };
  }

  initializeGrid(
    weighted: boolean,
    start: Array<number>,
    end: Array<number>
  ): Array<Array<INodeProperties>> {
    const grid: Array<Array<INodeProperties>> = [];
    for (let row = 0; row < DefaultValues.DefaultRows; row++) {
      const newRow = [];
      for (let col = 0; col < DefaultValues.DefaultColumns; col++) {
        newRow.push(this.initializeNode(row, col, weighted, start, end));
      }
      grid.push(newRow);
    }
    this.grid = grid;
    return grid;
  }

  toggleStart(row: number, col: number): void {
    this.grid[row][col].isStart = !this.grid[row][col].isStart;
  }
  toggleEnd(row: number, col: number): void {
    this.grid[row][col].isEnd = !this.grid[row][col].isEnd;
  }
  toggleWall(row: number, col: number): void {
    this.grid[row][col].isWall = !this.grid[row][col].isWall;
  }
}
