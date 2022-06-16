import categoryCheck from "../../../utils/categoryCheck";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import notFavTask from "../../../images/fav-icon.png";
import favTask from "../../../images/fav-filled-icon.png";
import { useState, useEffect } from "react";

function TaskMini({ task: { taskName, category } }) {
  const iconSrc = categoryCheck(category);
  const taskConcluded = false;
  return (
    <div className="task">
      {taskConcluded && (
        <img
          src={greenCheck}
          alt="A success check icon"
          className="taskConcluded"
        />
      )}
      <img src={iconSrc.img} alt={iconSrc.imgDescrip} />
      <h3>{taskName}</h3>
      <img src={favTask} alt="A heart favorite icon" className="favIcon" />
    </div>
  );
}

function TaskExpanded({ task: { taskName, taskTime, taskReward, category } }) {
  const [sliderValue, setSliderValue] = useState(taskTime.minMedium);
  const [difficulty, setDifficulty] = useState("");
  const taskConcluded = false;

  const iconSrc = categoryCheck(category);

  useEffect(() => {
    if (sliderValue <= taskTime.maxEasy) {
      setDifficulty("Easy");
    } else if (sliderValue >= taskTime.minHard) {
      setDifficulty("Hard");
    } else {
      setDifficulty("Medium");
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
        <img src={iconSrc.img} alt={iconSrc.imgDescrip} />
        <div className="titleFavoriteWrapper">
          <img src="./fav-icon.png" alt="favorite" className="favIcon" />
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
    </div>
  );
}

export { TaskExpanded, TaskMini };
