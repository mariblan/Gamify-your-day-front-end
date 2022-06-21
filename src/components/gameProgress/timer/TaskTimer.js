import { useState, useEffect, useContext } from "react";
import "./timer.css";
import canary from "../../../images/canary-normal.png";
import apple from "../../../images/apple-color.png";
import chore from "../../../images/chores-icon.png";
import social from "../../../images/social-icon.png";
import work from "../../../images/work-icon.png";
import care from "../../../images/self-care-icon.png";
import errand from "../../../images/errands-icon.png";
import misc from "../../../images/misc-icon.png";
import { useNavigate } from "react-router-dom";

export default function TaskTimer({ gottenTask }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [timerInit, setTimerInit] = useState(false);
  const [taskFailureActive, setTaskFailureActive] = useState(false);
  const [icon, setIcon] = useState(false);
  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();
  //Sets the countdown for the timer and prints it in the screen.
  useEffect(() => {
    setTimeout(() => {
      setTimerInit(true);
    }, 1000);
  });
  useEffect(() => {
    timerInit === true &&
      seconds > 0 &&
      setTimeout(() => {
        setSeconds((prevS) => prevS - 1);
      }, 1000);
  }, [seconds, timerInit]);
  useEffect(() => {
    timerInit === true &&
      seconds === 0 &&
      minutes > 0 &&
      setTimeout(() => {
        setSeconds(59);
        setMinutes((prevM) => prevM - 1);
      }, 1000);
  }, [seconds, minutes, timerInit]);
  useEffect(() => {
    timerInit === true &&
      seconds === 0 &&
      minutes === 0 &&
      setTimeout(() => {
        clearTimeout();
        //navigate("/taskfailure");
        setTaskFailureActive(true);
      });
  });
  useEffect(() => {
    setIcon((icon) => {
      if (gottenTask.category === "chores") {
        return chore;
      } else if (gottenTask.category === "social") {
        return social;
      } else if (gottenTask.category === "work") {
        return work;
      } else if (gottenTask.category === "errands") {
        return errand;
      } else if (gottenTask.category === "care") {
        return care;
      } else if (gottenTask.category === "miscellaneous") {
        return misc;
      }
    });
  }, [icon, gottenTask.category]);

  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="chicken-bg">
        <img className="chicken" src={canary} alt="canary-normal" />
        <div className="box">
          <div className="timer">
            <h2>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h2>
            <div className="tasks-options">
              <button className="fadedBtn" type="button">
                ||{" "}
              </button>
            </div>
          </div>
          <div className="task">
            <img className="icon" src={icon} alt="icon-task" />
            <h5 className="">{gottenTask.taskName}</h5>
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
              <button className="mainBtn" type="button">
                I'm done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
