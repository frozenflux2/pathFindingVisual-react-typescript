/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import { IAnimator, INodeProperties } from "./interfaces";

export default class Animator implements IAnimator {
  visitedSpeed: number;
  shortestSpeed: number;
  constructor() {
    this.visitedSpeed = 10;
    this.shortestSpeed = 50;
  }
  animate(
    visitedNodesInOrder: Array<INodeProperties>,
    nodesInShortestPathOrder: Array<INodeProperties>
  ) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, this.visitedSpeed * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        let el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el) el.className = "node node-visited";
      }, this.visitedSpeed * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder: Array<INodeProperties>) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        let el = document.getElementById(`node-${node.row}-${node.col}`);
        if (el) el.className = "node node-shortest-path";
      }, this.shortestSpeed * i);
    }
  }

  updateSpeed(visitedSpeed: number, shortestSpeed: number) {
    this.visitedSpeed = visitedSpeed;
    this.shortestSpeed = shortestSpeed;
  }
}
