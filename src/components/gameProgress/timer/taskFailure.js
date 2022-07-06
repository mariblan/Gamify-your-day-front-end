import { useEffect, useState } from "react";
import { useTask } from "../../../taskContext";
import "./timer.css";
import applecolor from "../../../images/apple-color.png";
import applebw from "../../../images/apple-bw.png";
import canarysad from "../../../images/canary-sad.png";
import failedicon from "../../../images/failed-task-icon.png";
import checkCategory from "../../../utils/categoryCheck";
import { useNavigate } from "react-router-dom";
import renderApples from "../../../utils/generateApples";
import { addFailed, removeFromToday } from "../../../fetchDB/fetchDB";

export default function TaskFailure() {
  const {
    user,
    setUser,
    userSettings,
    setUserSettings,
    gottenTask,
    gottenTask: { taskId, taskName, category, sliderValue, difficulty, reward },
    setGottenTask,
    selectedPet,
    setSelectedPet,
    nextClicked,
    setNextClicked,
    userProgress,
    setTodaysList,
    setUserProgress,
    todaysCompleted,
    setTodaysCompleted,
    todaysSuccess,
    setTodaysSuccess,
    todaysFailed,
    setTodaysFailed,
    forfeited,
    setForfeited,
    gameFinalScreen,
  } = useTask();
  //So navigate can be use to redirect to pages.
  const navigate = useNavigate();
  const { icon, alt } = checkCategory(category);

  //Sets the initial value of the failedTask
  const [failedTask, setFailedTask] = useState(false);

  //Set failed task to the values of gottenTask updating reward to 0 so the
  //failedTask can be send to the failed array with the profer information.
  useEffect(() => {
    setFailedTask({ ...gottenTask, reward: 0 });
  }, []);

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

  useEffect(() => {
    failedTask && failedAndCompleted(user._id, failedTask);
  }, [failedTask]);

  //This function sets the nextClicked to false so in my list the start button
  //can add new values to userSettings. It also filters the failedTask out of
  //the array of userSettings so it cannot be picked again
  //in the apple button. Lastly, if redirects to the apple screen
  //if the pet is still hungry or to the final screen if the pet is not
  //hungry anymore. If you wish to continue the game, it also makes it so
  //after the first time you get redirected to the final screen you won't be
  //redirected again.
  const failureClick = () => {
    setNextClicked(false);
    setUserSettings(userSettings.filter((task) => task._id !== failedTask._id));
    setForfeited(false);
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
    setUserSettings(userSettings.filter((task) => task._id !== failedTask._id));
  };

  //To navigate to my list upon click but giving time so the animation displays.
  const navigateToList = () => setTimeout(navigate("../mytasks"), 150);

  return (
    console.log(userSettings) || (
      <div className="bodytimer">
        <button
          onClick={() => {
            myListClick();
            navigateToList();
          }}
          className="menu"
          type="menu"
        >
          My list
        </button>
        <div className="success">
          <img
            className="imagePet"
            src={selectedPet.mood[2]}
            alt={`${selectedPet.name} ${selectedPet.mood[2]}`}
          />
          <div className="boxsuccess">
            <div className="congrats">
              <div className="title-congrats">
                <img className="checkicon" src={failedicon} alt="" />
                <h2 id="congrat">
                  {forfeited === true ? "Forfeited" : "Time's up!"}
                </h2>
              </div>
              <h6>
                {forfeited
                  ? "It seems you gave up on the task..."
                  : "It seems you needed more time..."}
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
                {sliderValue} {sliderValue === 1 ? "minutes" : "minute"}
              </h6>
            </div>
            <div className="reward">
              <h6>Reward</h6>
              {renderApples("apple", reward)}
            </div>
            <div>
              <button onClick={failureClick} className="next">
                Next
              </button>
            </div>
          </div>
          <div className="boxpet">
            <img className="pet" src={selectedPet.mood[2]} alt="" />
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
