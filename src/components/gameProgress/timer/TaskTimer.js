import { useContext, useState, useEffect } from "react";
import { TaskContext } from "./taskContext";
import "./timer.css";
import canary from "../../../images/canary-normal.png";
import apple from "../../../images/apple-color.png";
import checkCategory from "../../../utils/categoryCheck";
import TaskTimerRender from "./taskTimerRender";
import { useNavigate } from "react-router-dom";
import { useTask } from "./taskContext";

export default function TaskTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(3);
  const [timerInit, setTimerInit] = useState(false);
  const [taskIcon, setTaskIcon] = useState(false);
  const {
    gottenTask: { category },
    setGottenTask,
  } = useTask();
  const [pauseActive, setPauseActive] = useState(false);

  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();
  //Sets the countdown for the timer and prints it in the screen.
  useEffect(() => {
    setTimeout(() => {
      setTimerInit(true);
    }, 1000);
  });

  console.log(category);
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
        navigate("/taskfailure");
      });
  });
  console.log(category);
  useEffect(() => {
    setTaskIcon(checkCategory(category));
  }, [category]);

  // const pause = () => {
  //   pauseActive === false ? setPauseActive(true) : setPauseActive(false);
  //   if (pauseActive === true) {
  //     clearTimeout();
  //   } else {
  //   }
  //   clearTimeout();
  // };
  // const forfeitTask = () => {
  //   clearTimeout();
  // };
  // const imDone = () => {
  //   navigate("/tasksuccess");
  //   setTimeout(() => {
  //     clearTimeout();
  //   });
  // };
  return (
    console.log(gottenTask.category) && (
      <TaskTimerRender
        // onClick={imDone}
        apple={apple}
        minutes={minutes}
        seconds={seconds}
        icon={taskIcon.icon}
        alt={taskIcon.alt}
        image={canary}
        gottenTaskName={gottenTask.taskName}
      />
    )
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
