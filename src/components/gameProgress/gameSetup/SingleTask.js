import checkCategory from "../../../utils/categoryCheck";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import notFavTask from "../../../images/fav-icon.png";
import favTask from "../../../images/fav-filled-icon.png";
import appleColor from "../../../images/apple-color.png";
import { useState, useEffect, useRef } from "react";

function TaskMini({
  task: { taskId, taskName, category },
  user: { favoriteTasks },
}) {
  const { icon, alt } = checkCategory(category);
  const taskConcluded = false;
  const minifiedTask = useRef(null);

  useEffect(() => {}, []);
  const handleClick = (e) => {};

  return (
    <div className="taskMini" ref={minifiedTask}>
      {taskConcluded && (
        <img
          src={greenCheck}
          alt="A success check icon"
          className="taskConcluded"
        />
      )}
      <img src={icon} alt={alt} />
      <h3>{taskName}</h3>
      <img
        src={favoriteTasks.includes(taskId) ? favTask : notFavTask}
        alt="A heart favorite icon"
        className="favIcon"
      />
    </div>
  );
}

function TaskExpanded({
  task: { taskId, taskName, taskTime, category },
  user: { favoriteTasks },
}) {
  const [sliderValue, setSliderValue] = useState(taskTime.minMedium);
  const [difficulty, setDifficulty] = useState("");
  const [reward, setReward] = useState(2);
  const taskConcluded = false;

  const { icon, alt } = checkCategory(category);

  useEffect(() => {
    if (sliderValue <= taskTime.maxEasy) {
      setDifficulty("Easy");
      setReward(1);
    } else if (sliderValue >= taskTime.minHard) {
      setDifficulty("Hard");
      setReward(3);
    } else {
      setDifficulty("Medium");
      setReward(2);
    }
  }, [sliderValue]);

  const handleChange = (e) => {
    setSliderValue(e.target.value);
  };

  const renderApples = (num) => {
    if (num === 1) {
      return (
        <img src={appleColor} alt="A red apple" className="appleExpanded" />
      );
    } else if (num === 2) {
      return (
        <>
          <img src={appleColor} alt="A red apple" className="appleExpanded" />
          <img src={appleColor} alt="A red apple" className="appleExpanded" />
        </>
      );
    } else {
      return (
        <>
          <img src={appleColor} alt="A red apple" className="appleExpanded" />
          <img src={appleColor} alt="A red apple" className="appleExpanded" />
          <img src={appleColor} alt="A red apple" className="appleExpanded" />
        </>
      );
    }
  };

  return (
    <div className="taskExpanded">
      {taskConcluded && (
        <img src={redX} alt="An x icon" className="taskConcluded" />
      )}
      <div className="taskMain">
        <img src={icon} alt={alt} />
        <div className="titleFavoriteWrapper">
          <img
            src={favoriteTasks.includes(taskId) ? favTask : notFavTask}
            alt="favorite"
            className="favIcon"
          />
          <h2>{taskName}</h2>
        </div>
      </div>
      <div className="taskDescription">
        <div className="difficultyWrapper">
          <label htmlFor="timeSetter">Difficulty</label>
          <p>Total Time</p>
        </div>
        <div className="timeWrapper">
          <p>{difficulty}</p>
          <p>{sliderValue} min</p>
        </div>
      </div>
      <input
        type="range"
        id="timeSetter"
        name="timeSetter"
        min={taskTime.minEasy}
        max={taskTime.maxHard}
        step="1"
        value={sliderValue}
        onChange={handleChange}
      />
      <div className="rewardDisplay">
        <div className="rewardText">Reward: </div>
        <div className="rewardWrapper">{renderApples(reward)}</div>
      </div>
    </div>
  );
}

export { TaskExpanded, TaskMini };
