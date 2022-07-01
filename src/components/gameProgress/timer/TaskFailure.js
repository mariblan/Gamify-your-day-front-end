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
import { addFailed, addSuccess } from "../../../fetchDB/fetchDB";

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
    userProgress,
    setUserProgress,
    todaysCompleted,
    setTodaysCompleted,
    todaysSuccess,
    setTodaysSuccess,
    todaysFailed,
    setTodaysFailed,
  } = useTask();
  const { icon, alt } = checkCategory(category);

  const [failedTask, setFailedTask] = useState(false);
  const [newUsersettings, setNewUserSettings] = useState(false);

  useEffect(() => {
    setGottenTask((prev) => ({ ...prev, reward: 0 }));
    setFailedTask(gottenTask);
  }, []);

  const failedAndCompleted = async (userId, failedSettings) => {
    const taskFailed = await addFailed(userId, failedSettings).then(
      (updatedFailed) => updatedFailed
    );
    console.log(taskFailed);
    return setTodaysFailed(taskFailed);
  };

  useEffect(() => {
    failedTask && failedAndCompleted(user._id, failedTask);
  }, [failedTask]);

  useEffect(() => {
    setNewUserSettings(userSettings);
    const tasksAway = [];
    newUsersettings.filter((task) => {
      if (task.taskId !== failedTask.taskId) {
        tasksAway.push(task);
      }
      return tasksAway;
    });
  }, [newUsersettings]);

  useEffect(() => {
    setUserSettings(newUsersettings);
  }, [newUsersettings]);

  console.log(newUsersettings);
  console.log(userSettings);
  const navigate = useNavigate();

  return (
    console.log(userSettings) || (
      <div className="bodytimer">
        <button
          onClick={() => {
            setTimeout(navigate("/mytasks"), 150);
          }}
          className="menu"
          type="menu"
        >
          My list
        </button>
        <div className="success">
          <img
            className="chicken"
            src={selectedPet.mood[2]}
            alt="canary-normal"
          />
          <div className="boxsuccess">
            <div className="congrats">
              <div className="title-congrats">
                <img className="checkicon" src={failedicon} alt="" />
                <h2 id="congrat">Time's up!</h2>
              </div>
              <h6>It seems you needed more time...</h6>
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
