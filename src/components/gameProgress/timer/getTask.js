// import { useEffect, useContext } from "react";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GameGo from '../gameSetup/gameGo';
import { useTask } from '../../../taskContext';
import { toast } from 'react-toastify';

export default function GetTask() {
  //const [counter, setCounter] = useState("Start!");
  const [clicked, setClicked] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const {
    selectedPet,
    setSelectedPet,
    userSettings,
    userProgress,
    todaysList,
    setTodaysList,
    todaysFailed,
    setTodaysFailed,
    gottenTask,
    setGottenTask,
    toastErrorSettings,
    breakInterval,
    setBreakInterval,
    counter,
    setCounter,
  } = useTask();

  const navigate = useNavigate();

  function getTask() {
    if (userSettings.length === 0) {
      toast.error(
        'You have no tasks left to do, select more tasks to continue!',
        toastErrorSettings
      );
    } else if (userSettings.length > 0) {
      const index = Math.floor(Math.random() * userSettings.length);
      setClicked(true);
      setCounter(5);
      countDown();
      setGottenTask(userSettings[index]);
    }
  }
  const countDown = () => {
    let count = 5;
    const interval = setInterval(() => {
      if (count > 1) {
        setCounter((prevCounter) => prevCounter - 1);
        --count;
      } else {
        clearInterval(interval);
        setCounter('GO!');
        setTimeout(() => {
          navigate('../tasktimer');
        }, 1000);
      }
    }, 1000);
  };

  return (
    <div>
      <GameGo
        getTask={getTask}
        counter={counter}
        gottenTask={gottenTask}
        clicked={clicked}
      />
    </div>
  );
}
