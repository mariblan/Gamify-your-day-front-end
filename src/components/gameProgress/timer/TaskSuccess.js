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
import { addSuccess } from "../../../fetchDB/fetchDB";
export default function TaskSuccess() {
  const {
    user,
    setUser,
    userSettings,
    gottenTask,
    gottenTask: { taskId, taskName, category, sliderValue, difficulty, reward },
    setGottenTask,
    selectedPet,
    setSelectedPet,
    userProgress,
    setUserProgress,
    todaysSuccess,
    setTodaysSuccess,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();

  const { icon, alt } = checkCategory(category);
  const navigate = useNavigate();
  const [taskSuccess, setTaskSuccess] = useState(false);
  let elapsedTime = "";
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
  // console.log(elapsedTime);
  useEffect(() => {
    setTaskSuccess({ ...gottenTask, time: elapsedTime });
  }, []);

  const successAndCompleted = async (userId, successSettings) => {
    const taskSucceeded = await addSuccess(userId, successSettings).then(
      (updatedSuccess) => updatedSuccess
    );
    console.log(taskSucceeded);
    return setTodaysSuccess(taskSucceeded);
  };

  useEffect(() => {
    taskSuccess && successAndCompleted(user._id, taskSuccess);
  }, [taskSuccess]);

  const navigateToList = () => setTimeout(navigate("../mytasks"), 150);

  return (
    console.log(taskSuccess) || (
      <div className="bodytimer">
        <button className="menu" type="menu" onClick={navigateToList}>
          My list
        </button>
        <div className="success">
          <img
            className="chicken"
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
              <button
                onClick={() => {
                  setTimeout(navigate("../gamego"), 150);
                }}
                className="next"
              >
                Next
              </button>
            </div>
          </div>
          <div className="boxpet">
            <img className="pet" src={selectedPet.mood[1]} alt="" />
            <div className="petfood">
              {renderApples(
                "applereward",
                userProgress,
                selectedPet.hungerlevel
              )}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
