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
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import HelpModal from "../HelpModal/helpModal";
import { IHeaderProps, IHeaderState } from "../../Utility/interfaces";
import GitHubIcon from "@material-ui/icons/GitHub";
import "./topbar.css";

export default class Header extends Component<IHeaderProps, IHeaderState> {
  constructor(props: IHeaderProps) {
    super(props);
    this.state = {
      speedValue: "Fast",
      algoValue: "Dijkstra",
      mazeValue: "No Maze",
      showHelpModal: false,
    };
  }
  onSpeedChangeHandler = (e: any) => {
    if (e.target && e.target.value) {
      this.props.changeSpeed(e.target.value);
      this.setState({ speedValue: e.target.value });
    }
  };
  onAlgoChangeHandler = (e: any) => {
    if (e.target && e.target.value) {
      this.props.changeAlgo(e.target.value);
      this.setState({ algoValue: e.target.value });
    }
  };
  onMazeChangeHandler = (e: any) => {
    if (e.target && e.target.value) {
      this.props.generateMaze(e.target.value);
      this.setState({ mazeValue: e.target.value });
    }
  };
  toggleShowModal = () => {
    this.setState({ showHelpModal: !this.state.showHelpModal });
  };
  render() {
    return (
      <div className="nav">
        <div className="helpModal">
          <HelpModal
            showModal={this.state.showHelpModal}
            toggleShowModal={this.toggleShowModal}
          />
        </div>
        <Navbar
          expand="lg"
          bg="light"
          variant="light"
          className="flex-column border nav__navContainer"
        >
          <Navbar.Brand
            href="."
            style={{
              fontWeight: "bold",
              marginRight: "0px",
            }}
          >
            PATHFINDING VISUALIZER
          </Navbar.Brand>{" "}
          <div className="selectorMenu">
            <select
              disabled={this.props.visualized}
              onChange={this.onSpeedChangeHandler}
              value={this.state.speedValue}
            >
              <option value="Slow">Slow</option>
              <option value="Average">Average</option>
              <option value="Fast">Fast</option>
            </select>
            <select
              disabled={this.props.visualized}
              onChange={this.onAlgoChangeHandler}
              value={this.state.algoValue}
            >
              <option value="Dijkstra">Dijkstra</option>
              <option value="Bellman-Ford">Bellman-Ford</option>
              <option value="BFS">BFS</option>
              <option value="DFS">DFS</option>
            </select>

            <select
              disabled={this.props.visualized}
              onChange={this.onMazeChangeHandler}
              value={this.state.mazeValue}
            >
              <option value="None">No Maze</option>
              <option value="Random">Random</option>
              <option value="RecursiveDivision">RecursiveDivision</option>
            </select>

            <Button
              className="visualize-it-button"
              onClick={this.props.visualize}
              disabled={this.props.visualized}
            >
              Visualize
            </Button>
            <Button
              className="non-visualize-button"
              onClick={this.props.changeWeights}
              disabled={this.props.visualized}
            >
              New Weights
            </Button>
            <Button
              className="non-visualize-button"
              onClick={this.props.clearBoard}
              disabled={this.props.visualized}
            >
              New Board
            </Button>
          </div>
          <div className="nav__footer">
            <Button
              className="how-to-use-button"
              disabled={this.props.visualized}
              onClick={() =>
                this.setState({ showHelpModal: !this.state.showHelpModal })
              }
            >
              How To Use?
            </Button>
            <Nav.Link href="https://github.com/GunjanKadu">
              <span
                style={{
                  color: "black",
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <span style={{ marginRight: "7px" }}>Made by Gunjan Kadu</span>
                <span>
                  <GitHubIcon />
                </span>
              </span>
            </Nav.Link>
          </div>
        </Navbar>
      </div>
    );
  }
}
