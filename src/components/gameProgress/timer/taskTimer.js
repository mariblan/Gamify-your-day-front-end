import { useState, useEffect } from "react";
import "./timer.css";
import canary from "../../../images/canary-normal.png";
import apple from "../../../images/apple-color.png";
import checkCategory from "../../../utils/categoryCheck";
import TaskTimerRender from "./taskTimerRender";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../../taskContext";
import { TimerSeconds } from "../../../utils/timerSetTimeout";
import { confirm } from "react-confirm-box";
import { addToProgress } from "../../../fetchDB/fetchDB";

export default function TaskTimer() {
  const [timerInit, setTimerInit] = useState(false);
  const {
    selectedPet,
    setSelectedPet,
    user,
    setUser,
    userProgress,
    setUserProgress,
    userSettings,
    gottenTask: { taskName, category, sliderValue, difficulty, reward },
    setGottenTask,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();
  const [paused, setPaused] = useState(false);
  const [done, setDone] = useState(false);
  const { icon, alt } = checkCategory(category);

  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();
  //Sets the countdown for the timer and prints it in the screen.
  useEffect(() => {
    setMinutes(sliderValue);
    setSeconds(0);
    setTimeout(() => {
      setTimerInit(true);
    }, 1000);
  }, [setMinutes, setSeconds]);

  TimerSeconds(timerInit, paused, setPaused, done, setDone);
  //console.log(category);
  //console.log(minutes, seconds);
  const pause = () => {
    paused === false ? setPaused(true) : setPaused(false);
  };
  const imDone = async () => {
    done === false ? setDone(true) : setPaused(false);
    // setUserProgress((prevProgres) => prevProgres + reward);
    if (userProgress >= 0) {
      const newUserProgress = userProgress + reward;
      await addToProgress(user._id, newUserProgress).then((progress) => {
        setUserProgress(progress);
        navigate("../tasksuccess");
      });
    }
  };

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className="react-confirm-box">
          <h4>
            If you forfeit the task you will not be able to go back to it and
            you will lose your reward. Are you sure you want to forfeit the
            task?
          </h4>
          <button
            className="forfeit"
            onClick={() => {
              onConfirm();
              navigate("../taskfailure");
            }}
          >
            {" "}
            Forfeit{" "}
          </button>
          <button
            className="continue"
            onClick={() => {
              onCancel();
              setPaused(false);
            }}
          >
            {" "}
            Continue{" "}
          </button>
        </div>
      );
    },
  };
  const forfeitTask = async () => {
    setPaused(true);
    const result = await confirm("Are you sure?", options);
    if (result) {
      console.log("You click yes!");
      return;
    }
    console.log("You click No!");
  };

  //console.log(paused);
  //console.log(done);
  //console.log(selectedPet);
  return (
    console.log(userSettings) || (
      <TaskTimerRender
        pauseClick={pause}
        imDoneClick={imDone}
        forfeitTask={forfeitTask}
        apple={apple}
        icon={icon}
        alt={alt}
        image={selectedPet.mood[0]}
      />
    )
  );
}
