/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import React, { Component } from "react";
import Header from "../TopBar/topbar";
import Node from "../Node/node";
import Animator from "../../Utility/Animator";
import {
  randomWalls,
  recursiveDivision,
} from "../../Utility/RandomWalls/Mazes";
import Grid from "../../Utility/grid";
import {
  algo,
  IGrid,
  INodeProperties,
  IVisualizerState,
} from "../../Utility/interfaces";
import BellmanFord from "../../Utility/Algorithms/BellmanFord";
import BFS from "../../Utility/Algorithms/BFS";
import DFS from "../../Utility/Algorithms/DFS";
import Dijkstra from "../../Utility/Algorithms/Dijkstra";

import "./board.css";
import { DefaultValues } from "../../Utility/constants";

export default class Visualizer extends Component<{}, IVisualizerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      algo: Dijkstra,
      algoText: "Dijkstra's",
      speed: "Fast",
      grid: new Grid(
        Dijkstra.weighted,
        DefaultValues.DEFAULT_START,
        DefaultValues.DEFAULT_END
      ),
      mouseIsPressed: false,
      animator: new Animator(),
      visualized: false,
      start: DefaultValues.DEFAULT_START,
      end: DefaultValues.DEFAULT_END,
      movingStart: false,
      movingEnd: false,
      windowHeight: null,
      windowWidth: null,
    };

    this.visualize = this.visualize.bind(this);
    this.speedChange = this.speedChange.bind(this);
    this.algoChange = this.algoChange.bind(this);
    this.clearBoard = this.clearBoard.bind(this);
    this.newWeights = this.newWeights.bind(this);
    this.generateMaze = this.generateMaze.bind(this);
  }

  componentWillMount() {
    this.setState(
      {
        windowHeight: window.innerHeight,
        windowWidth: window.innerWidth,
      },
      () => {
        const { windowWidth, grid } = this.state;
        if (windowWidth && windowWidth <= 1550 && windowWidth >= 1330) {
          DefaultValues.setRoworColumn(30, "columns");

          DefaultValues.setStartOrEnd([6, 24], "end");
        } else if (windowWidth && windowWidth <= 1330) {
          DefaultValues.setRoworColumn(25, "columns");
          DefaultValues.setStartOrEnd([6, 19], "end");
        } else {
          DefaultValues.DefaultColumns = 35;
        }
        grid?.initializeGrid(
          Dijkstra.weighted,
          DefaultValues.DEFAULT_START,
          DefaultValues.DEFAULT_END
        );
        this.setState({
          grid: grid,
          start: DefaultValues.DEFAULT_START,
          end: DefaultValues.DEFAULT_END,
        });
      }
    );
  }
  handleMouseDown(row: number, col: number) {
    const { grid, start, end, visualized } = this.state;
    if (visualized) return;
    if (start && end) {
      if (row === start[0] && col === start[1]) {
        this.setState({ movingStart: true });
      } else if (row === end[0] && col === end[1]) {
        this.setState({ movingEnd: true });
      } else {
        grid && grid.toggleWall(row, col);
      }
      this.setState({ grid: grid, mouseIsPressed: true });
    }
  }

  handleMouseEnter(row: number, col: number) {
    const {
      grid,
      start,
      end,
      mouseIsPressed,
      movingStart,
      movingEnd,
      visualized,
    } = this.state;
    if (!mouseIsPressed || visualized) return;
    if (start && end) {
      if (movingStart) {
        grid && grid.toggleStart(row, col);
        grid && grid.toggleStart(start[0], start[1]);
        this.setState({
          start: [row, col],
          movingStart: true,
        });
      } else if (movingEnd) {
        grid && grid.toggleEnd(row, col);
        grid && grid.toggleEnd(end[0], end[1]);
        this.setState({ end: [row, col], movingEnd: true });
      } else {
        grid && grid.toggleWall(row, col);
      }
      this.setState({
        grid: grid,
      });
    }
  }

  handleMouseUp() {
    const { visualized } = this.state;
    if (visualized) return;
    this.setState({
      mouseIsPressed: false,
      movingStart: false,
      movingEnd: false,
    });
  }

  algoChange(text: string) {
    const { grid, start, end, visualized } = this.state;
    if (visualized) return;
    if (start && end && grid) {
      const algo: {
        newAlgo: algo | null;
        newAlgoText: string | null;
        newGrid: IGrid | null;
      } = { newAlgo: null, newAlgoText: null, newGrid: null };

      this.unvisitNodes(false, start, end);
      switch (text) {
        case "Dijkstra":
          algo.newAlgo = Dijkstra;
          algo.newAlgoText = "Dijkstra's";
          algo.newGrid = new Grid(Dijkstra.weighted, start, end);
          algo.newGrid.initializeGrid(true, start, end);

          break;
        case "BFS":
          algo.newAlgo = BFS;
          algo.newAlgoText = "Breadth-First Search";
          algo.newGrid = new Grid(BFS.weighted, start, end);
          algo.newGrid.initializeGrid(false, start, end);

          break;
        case "DFS":
          algo.newAlgo = DFS;
          algo.newAlgoText = "Depth-First Search";
          algo.newGrid = new Grid(DFS.weighted, start, end);
          algo.newGrid.initializeGrid(false, start, end);

          break;
        case "Bellman-Ford":
          algo.newAlgo = BellmanFord;
          algo.newAlgoText = "Bellman-Ford";
          algo.newGrid = new Grid(BellmanFord.weighted, start, end);
          algo.newGrid.initializeGrid(true, start, end);

          break;
        default:
          return;
      }
      algo.newGrid = this.keepWalls(grid, algo.newGrid);
      this.setState({
        algo: algo.newAlgo,
        algoText: algo.newAlgoText,
        grid: algo.newGrid,
      });
    }
  }

  speedChange(text: string) {
    const speeds: {
      visitedSpeed: number | null;
      shortestSpeed: number | null;
    } = { visitedSpeed: null, shortestSpeed: null };
    switch (text) {
      case "Slow":
        speeds.visitedSpeed = 75;
        speeds.shortestSpeed = 375;
        break;
      case "Average":
        speeds.visitedSpeed = 25;
        speeds.shortestSpeed = 125;
        break;
      case "Fast":
        speeds.visitedSpeed = 10;
        speeds.shortestSpeed = 50;
        break;
      default:
        return;
    }
    this.state.animator?.updateSpeed(speeds.visitedSpeed, speeds.shortestSpeed);
  }

  visualize() {
    const { grid, algo, visualized, start, end, animator } = this.state;
    if (visualized) return;
    if (grid && start && end && algo && animator) {
      this.unvisitNodes(false, start, end);
      this.setState({ visualized: true });
      const traverser = new algo();
      const startNode = grid.grid[start[0]][start[1]];
      const endNode = grid.grid[end[0]][end[1]];
      if (startNode.isWall) {
        startNode.isWall = !startNode.isWall;
      }
      if (endNode.isWall) {
        endNode.isWall = !endNode.isWall;
      }
      let visitedNodesInOrder:
        | Array<INodeProperties>
        | undefined = traverser.traverse(grid.grid, startNode, endNode);
      let shortestPath = traverser.getShortestPath(startNode, endNode);
      if (visitedNodesInOrder) {
        animator?.animate(visitedNodesInOrder, shortestPath);
        let buttonLockTime =
          visitedNodesInOrder.length * animator.visitedSpeed +
          shortestPath.length * animator.shortestSpeed;
        setTimeout(() => this.setState({ visualized: false }), buttonLockTime);
      }
    }
  }

  unvisitNodes(removeWalls: boolean, start: Array<number>, end: Array<number>) {
    const { grid } = this.state;
    for (let row = 0; row < DefaultValues.DefaultRows; row++) {
      for (let col = 0; col < DefaultValues.DefaultColumns; col++) {
        let node: INodeProperties | undefined = grid?.grid[row][col];
        if (node) {
          const newLocal = document.getElementById(
            `node-${node.row}-${node.col}`
          );
          if (newLocal) newLocal.className = "node ";
          node.isVisited = false;
          node.previous = null;
          node.distance = Infinity;
          if (removeWalls) {
            node.isWall = false;
          } else if (node.isWall) {
            const newLocal_1 = document.getElementById(
              `node-${node.row}-${node.col}`
            );
            if (newLocal_1) newLocal_1.className = "node node-wall";
          }
          if (row === start[0] && col === start[1]) {
            const newLocal_2 = document.getElementById(
              `node-${start[0]}-${start[1]}`
            );
            if (newLocal_2) newLocal_2.className = "node node-start";
            node.isStart = true;
          }
          if (row === end[0] && col === end[1]) {
            const newLocal_3 = document.getElementById(
              `node-${end[0]}-${end[1]}`
            );
            if (newLocal_3) newLocal_3.className = "node node-end";
            node.isEnd = true;
          }
        }
      }
    }
    this.setState({ grid: grid, visualized: false });
  }

  clearBoard() {
    const { visualized } = this.state;
    if (visualized) return;
    this.unvisitNodes(
      true,
      DefaultValues.DEFAULT_START,
      DefaultValues.DEFAULT_END
    );
    this.setState({
      start: DefaultValues.DEFAULT_START,
      end: DefaultValues.DEFAULT_END,
    });
  }

  newWeights() {
    const { grid, algo, start, end, visualized } = this.state;
    if (visualized) return;
    if (start && algo && grid && end) {
      this.unvisitNodes(false, start, end);
      const newGrid = new Grid(algo.weighted, start, end);
      newGrid.initializeGrid(algo.weighted, start, end);
      for (let row = 0; row < DefaultValues.DefaultRows; row++) {
        for (let col = 0; col < DefaultValues.DefaultColumns; col++) {
          if (grid.grid[row][col].isWall) {
            newGrid.grid[row][col].isWall = true;
          }
        }
      }
      this.setState({ grid: newGrid });
    }
  }

  keepWalls(grid: IGrid, newGrid: IGrid) {
    for (let row = 0; row < DefaultValues.DefaultRows; row++) {
      for (let col = 0; col < DefaultValues.DefaultColumns; col++) {
        if (grid.grid[row][col].isWall) {
          newGrid.grid[row][col].isWall = true;
        }
      }
    }
    return newGrid;
  }

  generateMaze(type: string) {
    const { grid, start, end } = this.state;
    if (grid && start && end) {
      this.unvisitNodes(true, start, end);
      switch (type) {
        case "Random":
          randomWalls(grid);
          break;
        case "RecursiveDivision":
          recursiveDivision(grid);
          break;
        default:
          return;
      }
      this.setState({ grid: grid });

      this.unvisitNodes(false, start, end);
    }
  }

  render() {
    const { grid, mouseIsPressed, visualized, algo } = this.state;
    return (
      <div className="holder">
        <div className="header">
          <Header
            visualize={this.visualize}
            changeAlgo={this.algoChange}
            changeSpeed={this.speedChange}
            clearBoard={this.clearBoard}
            changeWeights={this.newWeights}
            visualized={visualized}
            generateMaze={this.generateMaze}
          ></Header>
        </div>

        <div className="body">
          <div className="information">
            <h3>{this.state.algoText} Algorithm</h3>
            <p>{algo?.text}</p>
          </div>
          <div className="board">
            {grid?.grid.map((row, rowIndex) => {
              return (
                <div key={rowIndex}>
                  {row.map((node, nodeIndex) => {
                    const { row, col, isEnd, isStart, isWall, weight } = node;
                    return (
                      <Node
                        key={nodeIndex}
                        col={col}
                        row={row}
                        isEnd={isEnd}
                        isStart={isStart}
                        isWall={isWall}
                        mouseIsPressed={mouseIsPressed}
                        onMouseDown={(row: number, col: number) =>
                          this.handleMouseDown(row, col)
                        }
                        onMouseEnter={(row: number, col: number) =>
                          this.handleMouseEnter(row, col)
                        }
                        onMouseUp={() => this.handleMouseUp()}
                        weight={weight}
                      ></Node>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
