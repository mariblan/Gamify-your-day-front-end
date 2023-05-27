import { useState, useEffect } from 'react';
import './timer.css';
import { appleColor } from '../../../images';
import TaskTimerRender from './taskTimerRender';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../../taskContext';
import { TimerSeconds, checkCategory } from '../../../utils';
import { confirm } from 'react-confirm-box';
import {
  addToProgress,
  addFailed,
  removeFromToday,
} from '../../../fetchDB/fetchDB';

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
    setTodaysList,
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
    disabled,
    setDisabled,
  } = useTask();

  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();

  //So the pause button in the timer can clear the time out or reinit the timeout
  const [paused, setPaused] = useState(false);

  //It controls when the timeout is cleard when the task is finished and redirects to the success screen
  const [done, setDone] = useState(false);

  //Function info to make the proper icon render with the category of the task randomly selected from the userSettings
  const { icon, alt } = checkCategory(category);

  //Sets the values of minutes and seconds for the timer and does a small countdown so the timer dosent start inmediately upon rendering the screen
  //so the user has a few seconds to process the task
  useEffect(() => {
    setMinutes(sliderValue);
    setSeconds(0);
    setTimeout(() => {
      setTimerInit(true);
    }, 200);
  }, [setMinutes, setSeconds]);

  //Component with the timer function to make it work.
  TimerSeconds(timerInit, paused, setPaused, done, setDone);

  //Function to make the pause button work. Upon true clears the timers setTimeout and upon false it reinits it
  const pause = () => {
    paused === false ? setPaused(true) : setPaused(false);
  };

  //Function to make the "I'm done" button to work, setting it to true redirects you to the success screens and clears the interval
  //so the user can get the exat time that they took to make it
  const imDone = async () => {
    done === false ? setDone(true) : setDone(false);
    if (userProgress >= 0) {
      const newUserProgress = userProgress + reward;
      await addToProgress(user._id, newUserProgress).then((progress) => {
        setUserProgress(progress);
        navigate('../tasksuccess');
      });
    }
  };

  //Configurates the options for the confirm box upon clicking forfeit task and the functionality of its buttons. When clicking in forfeit it clears the interval
  //and disables the buttons until the box is closed. Clicking in the forfeit button of the confirm box it sends you to the failure screen and enables the buttons again.
  //On continue it clears the box and sets the timeout again and enabales the buttons.
  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className='react-confirm-box'>
          <h4>
            If you forfeit the task you will not be able to go back to it and
            you will lose your reward. Are you sure you want to forfeit the
            task?
          </h4>
          <div className='confirm-box-btnWrapper'>
            <button
              onClick={() => {
                onConfirm();
                navigate('../taskfailure');
                setDisabled(false);
              }}
            >
              Forfeit
            </button>
            <button
              onClick={() => {
                onCancel();
                setPaused(false);
                setDisabled(false);
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
    setDisabled(true);
    return await confirm('Are you sure?', options);
  };

  //This function send the failedTask to the failedList and to the
  //completeList and takes the task completed out of the todayList(backend).
  //It also updates the values of the todaysList(frontend) and the
  //todaysCompleted
  const failedAndCompleted = async (userId, failedSettings) => {
    const taskFailed = await addFailed(userId, failedSettings).then(
      (updatedFailed) => updatedFailed
    );
    const updateToday = await removeFromToday(userId, failedSettings._id).then(
      (updatedToday) => updatedToday
    );
    setTodaysList(updateToday);
    setTodaysCompleted((prev) => [...prev, taskFailed.slice(-1)[0]]);
    return setTodaysFailed(taskFailed);
  };

  //setting the initial state of failedTask
  const [failedTask, setFailedTask] = useState(false);

  //Set failed task to the values of gottenTask updating reward to 0 so the
  //failedTask can be send to the failed array with the profer information.
  useEffect(() => {
    setFailedTask({ ...gottenTask, reward: 0 });
  }, []);

  //This sets the options for opening the confirm box in the my list button in the component of the timer countdown, as it will make the
  //task to be failed. It disables the buttons upon click, clears the time out. The my list button within the box you has the funtionality of
  //deleting the task to the failed list in the database, making the task be filtered out of the userSettings array and settubg the nextClick to false
  //so in my list you can stablish changes upon clicking the "start" button. It also redirects you there and enables the other buttons.
  //Continue closes the box and sets the timeOut back again

  const goToMyList = async () => {
    setPaused(true);
    setForfeited(true);
    return await confirm('Are you sure?', option);
  };

  const givenUpClick = async () => {
    await failedAndCompleted(user._id, failedTask);
    setNextClicked(false);
    setUserSettings(userSettings.filter((task) => task._id !== failedTask._id));
    navigate('../mytasks');
  };

  const option = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className='react-confirm-box'>
          <h4>
            If you go back to your list, you will loose this task and won't be
            able to do it later. Are you sure you want to proceed?
          </h4>
          <div className='confirm-box-btnWrapper'>
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

  return (
    <TaskTimerRender
      pauseClick={pause}
      imDoneClick={imDone}
      forfeitTask={forfeitTask}
      goToMyList={goToMyList}
      // givenUpTask={givenUpTask}
      apple={appleColor}
      icon={icon}
      alt={alt}
      image={selectedPet.mood[0]}
    />
  );
  // );
}
