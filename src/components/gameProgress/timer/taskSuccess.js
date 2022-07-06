import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext";
import "./timer.css";
import canaryhappy from "../../../images/canary-happy.png";
import applecolor from "../../../images/apple-color.png";
import appleBW from "../../../images/apple-bw.png";
import checkicon from "../../../images/check-icon.png";
import checkCategory from "../../../utils/categoryCheck";
import { useNavigate } from "react-router-dom";
import renderApples from "../../../utils/generateApples";
import { addSuccess, removeFromToday } from "../../../fetchDB/fetchDB";

export default function TaskSuccess() {
  const {
    user,
    setUser,
    userSettings,
    setUserSettings,
    gottenTask,
    gottenTask: { taskId, taskName, category, sliderValue, difficulty, reward },
    selectedPet,
    setSelectedPet,
    userProgress,
    setUserProgress,
    todaysSuccess,
    setNextClicked,
    todaysList,
    setTodaysList,
    setTodaysSuccess,
    setTodaysCompleted,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    gameFinalScreen,
  } = useTask();
  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();

  //Function info to make the proper icon render with the category of the task randomly selected from the userSettings
  const { icon, alt } = checkCategory(category);

  //Initial state of the taskSuccess
  const [taskSuccess, setTaskSuccess] = useState(false);

  //Variable that can be modified to get the elapsed time in the taskTimer in the getElapsedTime funtion
  let elapsedTime = "";

  //Function to get how much time the person took to complete the action.
  const getElapsedTime = () => {
    const secondsto = 60 - seconds;
    const minutesto = minutes - 1;
    if (seconds > 0 && minutes === sliderValue - 1) {
      if (secondsto < 10) {
        // console.log(`00:0${secondsto}`);
        elapsedTime = `00:0${secondsto}`;
      } else {
        // console.log(`00:${secondsto}`);
        elapsedTime = `00:${secondsto}`;
      }
    } else if (seconds >= 0) {
      if (secondsto < 10 && minutesto < 10) {
        // console.log(`0${minutesto}:0${secondsto}`);
        elapsedTime = `0${minutesto}:0${secondsto}`;
      } else if (seconds >= 10 && minutes < 10) {
        // console.log(`0${minutesto}:${secondsto}`);
        elapsedTime = `0${minutesto}:${secondsto}`;
      } else if (seconds < 10 && minutes > 10) {
        // console.log(`${minutesto}:0${secondsto}`);
        elapsedTime = `${minutesto}:0${secondsto}`;
      } else {
        // console.log(`${minutesto}:${secondsto}`);
        elapsedTime = `${minutesto}:${secondsto}`;
      }
    }
    return elapsedTime;
  };

  getElapsedTime();

  //UseEffect sets the taskSuccess to the previous value of gottenTask and adds elapsedTime value
  //upon the key of time.
  useEffect(() => {
    setTaskSuccess({ ...gottenTask, time: elapsedTime });
  }, []);

  //Next function sends to the database the successTask to the
  //database into the successList and the completedList
  const successAndCompleted = async (userId, successSettings) => {
    const taskSucceeded = await addSuccess(userId, successSettings).then(
      (updatedSuccess) => updatedSuccess
    );
    const updateToday = await removeFromToday(userId, successSettings._id).then(
      (updatedToday) => updatedToday
    );
    console.log(taskSucceeded);
    setTodaysList(updateToday);
    setTodaysCompleted((prev) => [...prev, taskSucceeded.slice(-1)[0]]);
    return setTodaysSuccess(taskSucceeded);
  };

  useEffect(() => {
    taskSuccess && successAndCompleted(user._id, taskSuccess);
  }, [taskSuccess]);

  //This function sets the nextClicked to false so in my list the start button
  //can add new values to userSettings. It also filters the success task out of
  //the array of userSettings so it cannot be picked again
  //in the apple button. Lastly, if redirects to the apple screen upon
  //if the pet is still hungry or to the final screen if the pet is not
  //hungry anymore. If you wish to continue the game, it also makes it so
  //after the first time you get redirected to the final screen you won't be
  //redirected again.
  const successClick = () => {
    setNextClicked(false);
    setUserSettings(
      userSettings.filter((task) => task._id !== taskSuccess._id)
    );
    if (selectedPet.hungerlevel > userProgress) {
      setTimeout(navigate("../gamego"), 150);
    } else if (selectedPet.hungerlevel <= userProgress && gameFinalScreen) {
      setTimeout(navigate("../gameover"), 150);
    } else if (selectedPet.hungerlevel <= userProgress && !gameFinalScreen) {
      setTimeout(navigate("../gamego"), 150);
    }
  };

  //This button makes the nextClicked false so in my list new values
  //can be added. It also filters the userSettings array to take out the
  //successTask, so if the next button is not clicked, the array gets updated
  //properly and the completed tasks cannot be selected.

  const myListClick = () => {
    setNextClicked(false);
    setUserSettings(
      userSettings.filter((task) => task._id !== taskSuccess._id)
    );
  };

  //Function to navigate to my tasks withing the 150 seconds of the time out upon clicking the my list button
  const navigateToList = () => setTimeout(navigate("../mytasks"), 150);

  return (
    <div className="bodytimer">
      {console.log(todaysList)}
      <button
        className="menu"
        type="menu"
        onClick={() => {
          myListClick();
          navigateToList();
        }}
      >
        My list
      </button>
      <div className="success">
        <img
          className="imagePet"
          src={selectedPet.mood[1]}
          alt="canary-normal"
        />
        <div className="boxsuccess">
          <div className="congrats">
            <div className="title-congrats">
              <img className="checkicon" src={checkicon} alt="" />
              <h2 id="congrat">Well done!</h2>
            </div>
            <h6>
              You finished your task with{" "}
              {minutes === 0 ? "" : `${minutes} minutes and `}
              {seconds < 10 ? `0${seconds}` : seconds} seconds remaining
            </h6>
          </div>
          <div className="task">
            <img className="icon" src={icon} alt={alt} />
            <h5 className="">{taskName}</h5>
          </div>
          <div className="difficulty">
            <h6 className="category">Difficulty</h6>
            <h6 className="info">{difficulty}</h6>
          </div>
          <div className="time">
            <h6 className="category">Total time</h6>
            <h6 className="info">
              {sliderValue} {sliderValue === 1 ? "minute" : "minutes"}
            </h6>
          </div>
          <div className="reward">
            <h6>Reward</h6>
            {renderApples("apple", reward)}
          </div>
          <div>
            <button onClick={successClick} className="next">
              Next
            </button>
          </div>
        </div>
        <div className="boxpet">
          <img className="pet" src={selectedPet.mood[1]} alt="" />
          <div className="petfood">
            {renderApples("applereward", userProgress, selectedPet.hungerlevel)}
          </div>
        </div>
      </div>
    </div>
  );
}
