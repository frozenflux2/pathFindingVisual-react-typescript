/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { IDFS, INodeProperties } from "../interfaces";
import Finder from "./Finder";
export default class DFS extends Finder implements IDFS {
  static weighted = false;
  static _time = 25;
  static text = `Depth-first search works on unweighted graphs and does not
  guarantee the shortest path. This algorithm visits one node at a time. At
  each node it visits it selects an unvisited neighbor and moves to
  that node. It repeats this process until it reaches a node with no unvisited
  neighbors. It then backtracks to a node which has unvisited neighbors and
  moves forward down that path. It repeats this until all nodes that can
  be visited have been, or until it reaches the destination node.`;
  traverse(
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> | undefined {
    const unvisited = [];
    const visitedNodesInOrder = [];
    startNode.isVisited = true;
    startNode.previous = null;
    unvisited.push(startNode);
    visitedNodesInOrder.push(startNode);
    while (unvisited.length !== 0) {
      //console.log(unvisited);
      let currentNode: any = unvisited.pop();
      if (currentNode === endNode) return visitedNodesInOrder;
      currentNode.isVisited = true;
      visitedNodesInOrder.push(currentNode);
      let neighbors = this.getUnvisitedNeighbors(currentNode, grid);

      for (const neighbor of neighbors) {
        neighbor.previous = currentNode;
        unvisited.push(neighbor);
      }
    }
    return visitedNodesInOrder;
  }
}
export type TDFS = typeof DFS;
