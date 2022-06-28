import { useTask } from "../../../taskContext";
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
}) {
  const {
    gottenTask: { taskName, sliderValue, difficulty, reward },
    setGottenTask,
    selectedPet,
    setSelectedPet,
    userSettings,
    userProgress,
    setUserProgress,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();
  const navigate = useNavigate();
  console.log(reward);
  console.log(userProgress);
  return (
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
      <div className="chicken-bg">
        <img
          className="chicken"
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
                ||{" "}
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
              <button onClick={imDoneClick} className="mainBtn" type="button">
                I'm done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
