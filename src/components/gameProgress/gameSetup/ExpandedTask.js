import checkCategory from "../../../utils/categoryCheck";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import notFavTask from "../../../images/fav-icon.png";
import favTask from "../../../images/fav-filled-icon.png";
import renderApples from "../../../utils/generateApples";
import { useState, useEffect } from "react";

export default function TaskExpanded({
  task: { taskId, taskName, taskTime, category },
  user: { favoriteTasks },
}) {
  const [sliderValue, setSliderValue] = useState(taskTime.minMedium);
  const [difficulty, setDifficulty] = useState("");
  const [reward, setReward] = useState(2);
  const taskConcluded = false; //This goes to the persistence layer!

  // Function that checks the category of a task and saves the relevant
  // icon and alt description for a mapping component call (to save from
  // having to import all icons in multiple files)
  const { icon, alt } = checkCategory(category);

  // This useEffect checks the value of the slider and compares it to the
  // difficulty threshold, to change the difficulty text and reward
  // displayed on screen
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

  // Saves the value of the slider input in state
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
          {/* renderApples is a placeholder function that needs rework once a 
          proper persistence layer is added to the project and renders the right
          amount of apples based on user progress.
           */}
          {renderApples(reward, "appleExpanded")}
        </div>
      </div>
    </div>
  );
}
