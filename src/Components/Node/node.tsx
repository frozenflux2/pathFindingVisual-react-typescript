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
import Alert from "react-bootstrap/Alert";

import { INodeProps } from "../../Utility/interfaces";

import "./node.css";

export default class Node extends Component<INodeProps, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      show: false,
    };
  }
  nodeType = (node: INodeProps): string => {
    const type = node.isEnd
      ? "node-end"
      : node.isStart
      ? "node-start"
      : node.isWall
      ? "node-wall"
      : " ";
    return type;
  };

  render() {
    const {
      col,
      row,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      weight,
      isWall,
      isStart,
      isEnd,
    } = this.props;
    return (
      <div
        className="node-box"
        onMouseEnter={() => {
          this.setState({ show: true });
        }}
        onMouseLeave={() => {
          this.setState({ show: false });
        }}
      >
        {this.state.show && (
          <Alert variant="warning" className="alert">
            <p style={{ fontWeight: "bold", fontSize: "11px" }}>
              Current Node Info
            </p>
            <p className="infoNode">Row: {row}</p>
            <p className="infoNode">Column: {col}</p>
            <p className="infoNode">Weight: {weight}</p>
            <p className="infoNode">IsStart: {isStart.toString()}</p>
            <p className="infoNode">IsEnd: {isEnd.toString()}</p>
            <p className="infoNode">Is Wall: {isWall.toString()}</p>
          </Alert>
        )}
        <div
          id={`node-${row}-${col}`}
          className={`node ${this.nodeType(this.props)}`}
          onMouseDown={() => onMouseDown(row, col)}
          onMouseEnter={() => onMouseEnter(row, col)}
          onMouseUp={() => onMouseUp()}
        >
          <p>{weight}</p>
        </div>
      </div>
    );
  }
}
