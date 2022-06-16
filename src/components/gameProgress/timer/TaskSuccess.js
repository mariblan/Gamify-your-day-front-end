import "./timer.css";
import canaryhappy from "../../../images/canary-happy.png";
import applecolor from "../../../images/apple-color.png";
import appleBW from "../../../images/apple-bw.png";

export default function TaskSuccess() {
  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="success">
        <div className="boxsuccess">
          <div className="congrats">
            <h2 id="congrat">Well done!</h2>
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
          <div className="next">
            <button>Next</button>
          </div>
        </div>
        <div className="boxpet">
          <img className="pet" src={canaryhappy} alt="" />
          <div className="reward">
            <img className="apple" src={applecolor} alt="" />
            <img className="apple" src={applecolor} alt="" />
            <img className="apple" src={appleBW} alt="" />
            <img className="apple" src={appleBW} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
