import { useTask } from "../../../taskContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import renderApples from "../../../utils/generateApples";
export default function TaskTimerRender({
  apple,
  icon,
  alt,
  image,
  pauseClick,
  imDoneClick,
  forfeitTask,
  goToMyList,
  // givenUpTask,
}) {
  const {
    gottenTask: { taskName, sliderValue, difficulty, reward },
    selectedPet,
    setSelectedPet,
    userSettings,
    userProgress,
    setUserProgress,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
    disabled,
    setDisabled,
  } = useTask();

  //Setting the buttons disabled value to false so they work as they keep getting disabled upon mount.
  useEffect(() => {
    setDisabled(false);
  }, []);

  const navigate = useNavigate();
  // console.log(reward);
  // console.log(userProgress);
  return (
    <div className="bodytimer">
      <button
        disabled={disabled}
        onClick={() => {
          goToMyList();
        }}
        className="menu"
        type="menu"
      >
        My list
      </button>
      <div className="chicken-bg">
        <img
          className="imagePet"
          src={image ? image : undefined}
          alt="canary-normal"
        />
        <div className="box">
          <div className="timer">
            <h2>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </h2>
            <div className="tasks-options">
              <button onClick={pauseClick} className="fadedBtn" type="button">
                | |
              </button>
            </div>
          </div>
          <div className="task">
            <img className="icon" src={icon ? icon : undefined} alt={alt} />
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
          <div className="tasks-options">
            <div>
              <button
                onClick={forfeitTask}
                className="forfeit-task"
                type="button"
              >
                Forfeit task
              </button>
            </div>
            <div>
              <button
                disabled={disabled}
                onClick={imDoneClick}
                className="mainBtn"
                type="button"
              >
                I'm done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
