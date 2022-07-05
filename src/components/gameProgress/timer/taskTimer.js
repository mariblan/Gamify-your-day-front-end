import { useState, useEffect } from "react";
import "./timer.css";
import apple from "../../../images/apple-color.png";
import checkCategory from "../../../utils/categoryCheck";
import TaskTimerRender from "./taskTimerRender";
import { useNavigate } from "react-router-dom";
import { useTask } from "../../../taskContext";
import { TimerSeconds } from "../../../utils/timerSetTimeout";
import { confirm } from "react-confirm-box";
import { addToProgress, addFailed } from "../../../fetchDB/fetchDB";

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
    setUserSettings,
    setNextClicked,
    todaysFailed,
    setTodaysFailed,
    todaysCompleted,
    setTodaysCompleted,
    gottenTask,
    setGottenTask,
    gottenTask: { taskName, category, sliderValue, difficulty, reward },
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    forfeited,
    setForfeited,
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
    }, 200);
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
          <div className="confirm-box-btnWrapper">
            <button
              onClick={() => {
                onConfirm();
                navigate("../taskfailure");
              }}
            >
              Forfeit
            </button>
            <button
              onClick={() => {
                onCancel();
                setPaused(false);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    },
  };

  const forfeitTask = async () => {
    setPaused(true);
    setForfeited(true);
    return await confirm("Are you sure?", options);
  };

  const [failedTask, setFailedTask] = useState(false);

  const failedAndCompleted = async (userId, failedSettings) => {
    const taskFailed = await addFailed(userId, failedSettings).then(
      (updatedFailed) => updatedFailed
    );
    console.log(taskFailed);
    setTodaysCompleted(taskFailed);
    return setTodaysFailed(taskFailed);
  };
  const givenUpTask = () => {
    setGottenTask((prev) => ({ ...prev, reward: 0 }));
    setFailedTask(gottenTask);
    return failedTask;
  };
  const givenUpClick = () => {
    console.log(failedTask);
    console.log(user._id);
    console.log(userSettings);
    failedAndCompleted(user._id, failedTask);
    //   setNextClicked(false);
    //   setUserSettings(
    userSettings.filter((task) => task._id !== failedTask._id);
    //   );
    //   setForfeited(false);
    //   navigate("../mytasks");
  };

  const option = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className="react-confirm-box">
          <h4>
            If you go back to your list, you will not be able to go back to it
            and you will lose your reward. Are you sure you want to proceed?
          </h4>
          <div className="confirm-box-btnWrapper">
            <button
              onClick={() => {
                onConfirm();
                givenUpClick();
              }}
            >
              My list
            </button>
            <button
              onClick={() => {
                onCancel();
                setPaused(false);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    },
  };

  const goToMyList = async () => {
    setPaused(true);
    setForfeited(true);
    return await confirm("Are you sure?", option);
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
        goToMyList={goToMyList}
        givenUpTask={givenUpTask}
        apple={apple}
        icon={icon}
        alt={alt}
        image={selectedPet.mood[0]}
      />
    )
  );
}
