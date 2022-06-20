import "./timer.css";
import canaryhappy from "../../../images/canary-happy.png";
import applecolor from "../../../images/apple-color.png";
import appleBW from "../../../images/apple-bw.png";
import checkicon from "../../../images/check-icon.png";
import { Link, Outlet } from "react-router-dom";

export default function TaskSuccess() {
  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="success">
        <img className="chicken" src={canaryhappy} alt="canary-normal" />
        <div className="boxsuccess">
          <div className="congrats">
            <div className="title-congrats">
              <img className="checkicon" src={checkicon} alt="" />
              <h2 id="congrat">Well done!</h2>
            </div>
            <h6>You finished your task with 1:46 minutes remaining</h6>
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
          <div>
            <button className="next">
              <Link to="/gamego">Next</Link>
            </button>
          </div>
        </div>
        <div className="boxpet">
          <img className="pet" src={canaryhappy} alt="" />
          <div className="petfood">
            <img className="applereward" src={applecolor} alt="" />
            <img className="applereward" src={applecolor} alt="" />
            <img className="applereward" src={appleBW} alt="" />
            <img className="applereward" src={appleBW} alt="" />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
