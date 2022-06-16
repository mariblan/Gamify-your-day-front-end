import React from "react";
import "./timer.css";
import applecolor from "../../../images/apple-color.png";
import applewb from "../../../images/apple-bw.png";
import canarysad from "../../../images/canary-sad.png";

export default function TaskFailure() {
  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="success">
        <div className="box-success">
          <div className="congrats">
            <h2>Time's up!</h2>
            <h6>It seems you needed more time...</h6>
          </div>
          <div className="task">
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
            <img className="apple" src={applecolor} alt="apple1" />
            <img className="apple" src={applecolor} alt="apple2" />
          </div>
          <div className="next">
            <button>Next</button>
          </div>
        </div>
        <div className="box-pet">
          <img src={canarysad} alt="" />
          <div className="reward">
            <img src={applecolor} alt="" />
            <img src={applecolor} alt="" />
            <img src={applewb} alt="" />
            <img src={applewb} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
