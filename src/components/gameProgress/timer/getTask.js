// import { useEffect, useContext } from "react";
import { useTask } from "./taskContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskDB } from "../gameSetup/mockTaskDB";
import GameGo from "../gameSetup/gameGo";
import TaskTimer from "./taskTimer";

export default function GetTask() {
  const [counter, setCounter] = useState("Start!");
  const [clicked, setClicked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const {
    gottenTask,
    setGottenTask,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();

  const navigate = useNavigate();
  //const [countdownInit, setcountdownInit] = useState(3);
  function getTask() {
    const index = Math.floor(Math.random() * taskDB.length);
    //return arraytasks[index];
    //console.log(taskDB[index].taskName);
    //setInterval();
    setClicked(true);
    setCounter(5);
    countDown();
    console.log(taskDB[index]);
    setGottenTask(taskDB[index]);
  }

  const countDown = () => {
    let count = 5;
    const interval = setInterval(() => {
      if (count > 1) {
        setCounter((prevCounter) => prevCounter - 1);
        --count;
      } else {
        clearInterval(interval);
        setCounter("GO!");
        setTimeout(() => {
          navigate("/tasktimer");
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div>
      <GameGo
        onClick={getTask}
        counter={counter}
        gottenTask={gottenTask}
        clicked={clicked}
      />
    </div>
  );
}
