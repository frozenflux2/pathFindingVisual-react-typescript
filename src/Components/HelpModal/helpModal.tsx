/**
 *
 * @Project :  ${PathFinding Visualizer(Path Finding Visualizer)}
 * @CreatedBy ${Gunjan Kadu}
 * @Email  ${agunjan.kadu@gmail.com}
 * @Github https://github.com/GunjanKadu/
 * @date   2020-09-10 23:47:40
 *
 */
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { IHelpModalProps } from "../../Utility/interfaces";

import "./helpModal.css";
export default function Example(props: IHelpModalProps) {
  return (
    <>
      <Modal
        show={props.showModal}
        onHide={() => props.toggleShowModal()}
        backdrop="static"
        keyboard={false}
        className="modal"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="modal__title">HOW TO USE ?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="modal__content">
            <div className="modal__body">
              <div className="row row__1">
                <div className="start flex">
                  <div className="start__color"></div>
                  <p>START</p>
                </div>
                <div className="end flex">
                  <div className="end__color"></div>
                  <p>END</p>
                </div>
              </div>
              <div className=" row row__2">
                <div className="wall flex">
                  <div className="wall__color"></div>
                  <p>WAll</p>
                </div>
                <div className="visited flex">
                  <div className="visited__color"></div>
                  <p>VISITED</p>
                </div>
              </div>
              <div className="row row__3">
                <div className="shortest flex">
                  <div className="shortest__color"></div>
                  <p>SHORTEST</p>
                </div>
              </div>
            </div>

            <div className="info">
              <div className="info__info">
                1. YOU CAN MAKE WALL BY CLICKING AND BLOCK
              </div>
              <div className="info__info">
                2. YOU CAN MOVE{" "}
                <div
                  style={{
                    height: "20px",
                    width: "20px",
                    border: "2px solid black",
                    backgroundColor: "black",
                    display: "inline-block",
                  }}
                ></div>{" "}
                BY DRAGGING{" "}
              </div>
              <div className="info__info">
                3. YOU CAN CHOOSE ALGORITHM AND SPEED FROM SELECT BOX
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
