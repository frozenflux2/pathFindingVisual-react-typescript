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
import { IBellMan, INodeProperties } from "../interfaces";
import Finder from "./Finder";

export default class BellmanFord extends Finder implements IBellMan {
  static weighted = true;
  static text = `Bellman Ford algorithm works by overestimating the length of the path from the starting vertex to all other vertices. Then it iteratively relaxes those estimates by finding new paths that are shorter than the previously overestimated paths.`;
  traverse(
    grid: Array<Array<INodeProperties>>,
    startNode: INodeProperties,
    endNode: INodeProperties
  ): Array<INodeProperties> | undefined {
    const visitedNodesInOrder = [];
    const nodes = this.getAllNodes(grid);
    startNode.previous = null;
    startNode.distance = 0;
    //visitedNodesInOrder.push(startNode);
    let visited = Array(
      DefaultValues.DefaultRows * DefaultValues.DefaultColumns
    ).fill(false);
    for (
      let i = 0;
      i < DefaultValues.DefaultRows * DefaultValues.DefaultColumns - 1;
      i++
    ) {
      for (const node of nodes) {
        const neighbors = this.getUnvisitedNeighbors(node, grid);
        const { row, col } = node;
        if (
          !visited[row * DefaultValues.DefaultColumns + col] &&
          neighbors.length > 0
        ) {
          visitedNodesInOrder.push(node);
          visited[row * DefaultValues.DefaultColumns + col] = !visited[
            row * DefaultValues.DefaultColumns + col
          ];
        }
        for (const neighbor of neighbors) {
          let newDistance = node.distance + neighbor.weight;
          if (newDistance < neighbor.distance) {
            //if (!visitedNodesInOrder.includes(neighbor))
            // visitedNodesInOrder.push(neighbor);
            neighbor.distance = newDistance;
            neighbor.previous = node;
          }
        }
      }
    }
    return visitedNodesInOrder;
  }
}
export type TBellmanFord = typeof BellmanFord;
