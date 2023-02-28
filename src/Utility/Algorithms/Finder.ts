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
import { IFinder, INodeProperties } from "../interfaces";

export default class Finder implements IFinder {
  static _time = 12.5;
  getUnvisitedNeighbors(
    node: INodeProperties,
    grid: Array<Array<INodeProperties>>
  ): Array<INodeProperties> {
    let neighbors = [];
    const { col, row } = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    neighbors = neighbors.filter((neighbor) => !neighbor.isVisited);
    return neighbors.filter((neighbor) => !neighbor.isWall);
  }

  getShortestPath(
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> {
    const shortestPath = [];
    let currentNode = endNode;
    while (currentNode !== null && currentNode !== startNode) {
      shortestPath.unshift(currentNode);
      currentNode = currentNode.previous;
    }
    shortestPath.unshift(startNode);
    return shortestPath;
  }

  getAllNodes(grid: Array<Array<INodeProperties>>): Array<INodeProperties> {
    const nodes = [];
    for (let i = 0; i < DefaultValues.DefaultRows; i++) {
      for (let j = 0; j < DefaultValues.DefaultColumns; j++) {
        if (grid[i][j].isVisited || grid[i][j].isWall) continue;
        nodes.push(grid[i][j]);
      }
    }
    return nodes;
  }
}
