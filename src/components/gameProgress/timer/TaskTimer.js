import React from "react";
import "./timer.css";
import canary from "../../../images/canary-normal.png";
import apple from "../../../images/apple-color.png";
import chore from "../../../images/chores-icon.png";

export default function TaskTimer() {
  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="chicken-bg">
        <img className="chicken" src={canary} alt="canary-normal" />
        <div className="box">
          <div className="timer">
            <h2>10:00</h2>
            <div className="tasks-options">
              <button className="pause" type="button">
                ||{" "}
              </button>
            </div>
          </div>
          <div className="task">
            <img className="icon" src={chore} alt="icon-task" />
            <h5 className="">Book that appointment</h5>
          </div>
          <div className="difficulty">
            <h6 className="category">Difficulty</h6>
            <h6 className="info">Medium</h6>
          </div>
          <div className="time">
            <h6 className="category">Total time</h6>
            <h6 className="info">10 min</h6>
          </div>
          <div className="reward">
            <h6>Reward</h6>
            <img className="apple" src={apple} alt="apple1" />
            <img className="apple" src={apple} alt="apple2" />
          </div>
          <div className="tasks-options">
            <div>
              <button className="forfeit-task" type="button">
                Forfeit task
              </button>
            </div>
            <div>
              <button className="done" type="button">
                I'm done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
