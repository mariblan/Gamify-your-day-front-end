// import { useEffect, useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import GameGo from "../gameSetup/gameGo";
import { useTask } from "../../../taskContext";

export default function GetTask() {
  const [counter, setCounter] = useState("Start!");
  const [clicked, setClicked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const {
    selectedPet,
    setSelectedPet,
    userSettings,
    userProgress,
    todaysList,
    setTodaysList,
    todaysCompleted,
    setTodaysCompleted,
    todaysFailed,
    setTodaysFailed,
    gottenTask,
    setGottenTask,
  } = useTask();

  const navigate = useNavigate();
  //user && console.log(user);
  function getTask() {
    const index = Math.floor(Math.random() * userSettings.length);
    //return arraytasks[index];
    //console.log(taskDB[index].taskName);
    //setInterval();
    setClicked(true);
    setCounter(5);
    countDown();
    // console.log(todaysList[index]);
    console.log(userSettings);
    setGottenTask(userSettings[index]);
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
          navigate("../tasktimer");
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div>
      {console.log(userProgress)}
      <GameGo
        onClick={getTask}
        counter={counter}
        gottenTask={gottenTask}
        clicked={clicked}
      />
    </div>
  );
}
