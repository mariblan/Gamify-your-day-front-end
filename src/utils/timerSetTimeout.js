import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../taskContext';

function TimerSeconds(timerInit, paused, setPaused, done, setDone) {
  const {
    gottenTask,
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
        navigate('../taskfailure');
      }, 150);
  });
  useEffect(() => {
    timerInit === true &&
      seconds > 0 &&
      minutes >= 0 &&
      (paused === false || paused === true) &&
      done === true &&
      clearTimeout();
  });
  useEffect(() => {
    timerInit === true &&
      seconds >= 0 &&
      minutes >= 0 &&
      paused === true &&
      done === false &&
      clearTimeout();
  }, [seconds, minutes, timerInit, paused, done]);
}

export { TimerSeconds };
