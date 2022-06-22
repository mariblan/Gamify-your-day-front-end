import React, { useEffect, useContext } from "react";
import { TaskContext } from "./taskContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { taskDB } from "../gameSetup/mockTaskDB";
import GameGo from "../gameSetup/gameGo";
import TaskTimer from "./taskTimer";

export default function GetTask() {
  const [counter, setCounter] = useState("Start!");
  const [clicked, setClicked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const { gottenTask, setGottenTask } = useContext(TaskContext);
  // const [userTaskList, setUserTaskList] = useState([]);

  // useEffect(() => {
  //   setUserTaskList({
  //     category: "",
  //     taskdescription: "",
  //     taskid: 0,
  //     taskName: "",
  //     taskTime: {},
  //   });
  // }, []);

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
          //navigate("/tasktimer");
          setTimerActive(true);
        }, 1000);
      }
    }, 1000);
  };
  return (
    <div>
      {timerActive === false && (
        <GameGo
          onClick={getTask}
          counter={counter}
          gottenTask={gottenTask}
          clicked={clicked}
        />
      )}
      {/*TaskTimer has to actually get a single task in the userTaskList array, and not the whole thing*/}
      {timerActive === true && <TaskTimer gottenTask={gottenTask} />}
    </div>
  );
}
