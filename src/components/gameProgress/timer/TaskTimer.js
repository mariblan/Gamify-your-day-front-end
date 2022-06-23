import { useState, useEffect } from "react";
import "./timer.css";
import canary from "../../../images/canary-normal.png";
import apple from "../../../images/apple-color.png";
import checkCategory from "../../../utils/categoryCheck";
import TaskTimerRender from "./taskTimerRender";
import { useNavigate } from "react-router-dom";
import { useTask } from "./taskContext";
import { TimerSeconds } from "../../../utils/timerSetTimeout";

export default function TaskTimer() {
  const [timerInit, setTimerInit] = useState(false);
  const {
    gottenTask,
    setGottenTask,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const { icon, alt } = checkCategory(gottenTask.category);

  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();
  //Sets the countdown for the timer and prints it in the screen.
  useEffect(() => {
    setTimeout(() => {
      setTimerInit(true);
    }, 1000);
  });

  TimerSeconds(timerInit, paused, setPaused, done, setDone);
  console.log(gottenTask.category);

  const pause = () => {
    paused === false ? setPaused(true) : setPaused(false);
  };
  const imDone = () => {
    done === false ? setDone(true) : setPaused(false);
  };

  console.log(paused);
  console.log(done);
  return (
    <TaskTimerRender
      pauseClick={pause}
      imDoneClick={imDone}
      apple={apple}
      icon={icon}
      alt={alt}
      image={canary}
      gottenTaskName={gottenTask.taskName}
    />
    // <div className="bodytimer">
    //   <button className="menu" type="menu">
    //     Menu
    //   </button>
    //   <div className="chicken-bg">
    //     <img className="chicken" src={canary} alt="canary-normal" />
    //     <div className="box">
    //       <div className="timer">
    //         <h2>
    //           {minutes < 10 ? `0${minutes}` : minutes}:
    //           {seconds < 10 ? `0${seconds}` : seconds}
    //         </h2>
    //         <div className="tasks-options">
    //           <button className="fadedBtn" type="button">
    //             ||{" "}
    //           </button>
    //         </div>
    //       </div>
    //       <div className="task">
    //         <img className="icon" src={icon} alt="icon-task" />
    //         <h5 className="">{gottenTask.taskName}</h5>
    //       </div>
    //       <div className="difficulty">
    //         <h6 className="category">Difficulty</h6>
    //         <h6 className="info">Medium</h6>
    //       </div>
    //       <div className="time">
    //         <h6 className="category">Total time</h6>
    //         <h6 className="info">10 min</h6>
    //       </div>
    //       <div className="reward">
    //         <h6>Reward</h6>
    //         <img className="apple" src={apple} alt="apple1" />
    //         <img className="apple" src={apple} alt="apple2" />
    //       </div>
    //       <div className="tasks-options">
    //         <div>
    //           <button className="forfeit-task" type="button">
    //             Forfeit task
    //           </button>
    //         </div>
    //         <div>
    //           <button className="mainBtn" type="button">
    //             I'm done
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
