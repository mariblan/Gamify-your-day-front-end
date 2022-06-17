import checkCategory from "../../../utils/categoryCheck";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import notFavTask from "../../../images/fav-icon.png";
import favTask from "../../../images/fav-filled-icon.png";
import renderApples from "../../../utils/generateApples";
import { useState, useEffect, useRef } from "react";

function TaskMini({
  task: { taskId, taskName, category },
  user: { favoriteTasks },
}) {
  const { icon, alt } = checkCategory(category);
  const taskConcluded = false;
  const minifiedTask = useRef(null);

  useEffect(() => {}, []);
  // const handleClick = (e) => {};

  // This function is not working properly. The empty heart changes src upon click, but when the condition
  // is false, it doesn't go back to an empty heart.
  const toggleFavorite = (e) => {
    console.log(e.target.src);
    e.target.src =
      "http://localhost:3000/static/media/fav-icon.73fa405e50650ef9b42b.png"
        ? (e.target.src = favTask)
        : (e.target.src = notFavTask);
  };

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
        onClick={toggleFavorite}
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
  const taskConcluded = false; //This goes to the persistence layer!

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
        <div className="rewardWrapper">
          {renderApples(reward, "appleExpanded")}
        </div>
      </div>
    </div>
  );
}

export { TaskExpanded, TaskMini };
