/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { IBFS, INodeProperties } from "../interfaces";
import Finder from "./Finder";

export default class BFS extends Finder implements IBFS {
  static weighted = false;
  static text = `Breadth-first search works on unweighted graphs and
  guarantees the shortest path. This algorithm works by beginning at the
  starting node and visiting each of its neighbors. It then moves to
  each neighbor and visits any of its unvisited neighbors. It repeats this
  process spreading out across the graph until all nodes that can be visited
  have been, or until we reach the destination node.`;

  traverse(
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> | undefined {
    const unvisited: Array<INodeProperties> = [];
    const visitedNodesInOrder = [];
    startNode.isVisited = true;
    startNode.previous = null;
    unvisited.push(startNode);
    visitedNodesInOrder.push(startNode);
    while (unvisited.length !== 0) {
      let currentNode: any = unvisited.shift();
      if (currentNode === endNode) {
        return visitedNodesInOrder;
      }
      let neighbors = this.getUnvisitedNeighbors(currentNode, grid);
      for (const neighbor of neighbors) {
        neighbor.isVisited = true;
        neighbor.previous = currentNode;
        unvisited.push(neighbor);
        visitedNodesInOrder.push(neighbor);
      }
    }
    return visitedNodesInOrder;
  }
}
export type TBFS = typeof BFS;
