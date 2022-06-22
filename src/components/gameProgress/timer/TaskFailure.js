import { useContext, useState, useEffect } from "react";
import { useTask } from "./taskContext";
import "./timer.css";
import applecolor from "../../../images/apple-color.png";
import applebw from "../../../images/apple-bw.png";
import canarysad from "../../../images/canary-sad.png";
import failedicon from "../../../images/failed-task-icon.png";
import { Link, Outlet } from "react-router-dom";

export default function TaskFailure() {
  const {
    gottenTask: { taskName },
    setGottenTask,
  } = useTask();
  const [gottenTaskString, setGottenTaskString] = useState(false);
  const [gottenTaskObj, setGottenTaskObj] = useState(false);

  useEffect(() => {
    /*   setGottenTaskString(JSON.stringify(gottenTask.taskName))
    setGottenTaskObj(JSON.stringify(gottenTask, null, 10))
    console.log(gottenTaskObj) */
  }, []);

  // setGottenTaskString(JSON.stringify(gottenTask.taskName))
  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="success">
        <img className="chicken" src={canarysad} alt="canary-normal" />
        <div className="boxsuccess">
          <div className="congrats">
            <div className="title-congrats">
              <img className="checkicon" src={failedicon} alt="" />
              <h2 id="congrat">Time's up!</h2>
            </div>
            <h6>It seems you needed more time...</h6>
          </div>
          <div className="task">
            <h5 className="gottenTask">{taskName}</h5>
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
          <img className="pet" src={canarysad} alt="" />
          <div className="petfood">
            <img className="applereward" src={applecolor} alt="" />
            <img className="applereward" src={applecolor} alt="" />
            <img className="applereward" src={applebw} alt="" />
            <img className="applereward" src={applebw} alt="" />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
