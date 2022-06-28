import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTask } from "../taskContext";

function TimerSeconds(timerInit, paused, setPaused, done, setDone) {
  const {
    gottenTask,
    setGottenTask,
    userSettings: { slidervalue, difficulty, reward },
    seconds,
    setSeconds,
    minutes,
    setMinutes,
  } = useTask();
  const navigate = useNavigate();

  useEffect(() => {
    timerInit === true &&
      seconds > 0 &&
      paused === false &&
      done === false &&
      setTimeout(() => {
        setSeconds((prevS) => prevS - 1);
      }, 1000);
  }, [seconds, setSeconds, timerInit, paused, done]);
  useEffect(() => {
    timerInit === true &&
      seconds === 0 &&
      minutes > 0 &&
      paused === false &&
      done === false &&
      setTimeout(() => {
        setSeconds(59);
        setMinutes((prevM) => prevM - 1);
      }, 1000);
  }, [seconds, setSeconds, minutes, setMinutes, timerInit, paused, done]);
  useEffect(() => {
    timerInit === true &&
      seconds === 0 &&
      minutes === 0 &&
      paused === false &&
      done === false &&
      setTimeout(() => {
        clearTimeout();
        navigate("/taskfailure");
      });
  });
  useEffect(() => {
    timerInit === true &&
      seconds > 0 &&
      minutes >= 0 &&
      (paused === false || paused === true) &&
      done === true &&
      setTimeout(() => {
        clearTimeout();
        navigate("/tasksuccess");
      });
  });
  useEffect(() => {
    timerInit === true &&
      seconds >= 0 &&
      minutes >= 0 &&
      paused === true &&
      done === false &&
      setTimeout(() => {
        clearTimeout();
      });
  }, [seconds, minutes, timerInit, paused, done]);
}

// const forfeitTask = () => {
//   clearTimeout();
// };
// const imDone = () => {
//   navigate("/tasksuccess");
//   setTimeout(() => {
//     clearTimeout();
//   });
// };

export { TimerSeconds };
