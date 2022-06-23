import { useTask } from "../../../taskContext";

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
    gottenTask: { taskName },
    setGottenTask,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();
  console.log(minutes, seconds);
  return (
    <div className="bodytimer">
      <button className="menu" type="menu">
        Menu
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
            <h6 className="info">Medium</h6>
          </div>
          <div className="time">
            <h6 className="category">Total time</h6>
            <h6 className="info">10 min</h6>
          </div>
          <div className="reward">
            <h6>Reward</h6>
            <img className="apple" src={apple} alt="apple1" />
            <img className="apple" src={apple} alt="apple2" />
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
