/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { IDijkstra, INodeProperties } from "../interfaces";

import Pathfinder from "./Finder";

export default class Dijkstra extends Pathfinder implements IDijkstra {
  static weighted = true;
  static text = `Dijkstra's Algorithm works on the basis that any subpath B -> D of the shortest path A -> D between vertices A and D is also the shortest path between vertices B and D.Djikstra used this property in the opposite direction i.e we overestimate the distance of each vertex from the starting vertex. Then we visit each node and its neighbors to find the shortest subpath to those neighbors.
The algorithm uses a greedy approach in the sense that we find the next best solution hoping that the end result is the best solution for the whole problem.`;

  traverse(
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> | undefined {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    startNode.weight = 0;
    const unvisited: Array<INodeProperties> = this.getAllNodes(grid);

    while (unvisited.length !== 0) {
      this.sortNodesByDistance(unvisited);
      const closestNode: any = unvisited.shift();
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (closestNode?.distance === Infinity) return visitedNodesInOrder;
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode === endNode) return visitedNodesInOrder;
      let neighbors = this.getUnvisitedNeighbors(closestNode, grid);
      for (const neighbor of neighbors) {
        let newDistance = closestNode.distance + neighbor.weight;
        if (newDistance < neighbor.distance) {
          neighbor.distance = newDistance;
          neighbor.previous = closestNode;
        }
      }
    }
  }

  sortNodesByDistance(unvisitedNodes: Array<INodeProperties>): void {
    unvisitedNodes.sort(
      (nodeA: INodeProperties, nodeB: INodeProperties) =>
        nodeA.distance - nodeB.distance
    );
  }
}
export type TDijsktra = typeof Dijkstra;
