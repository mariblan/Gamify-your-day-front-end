import appleColor from "../../../images/apple-color.png";
import "./gameGo.css";
import { useTask } from "../../../taskContext";

export default function GameGo(props) {
  console.log(props);
  const {
    user,
    setUser,
    todaysList,
    setTodaysList,
    gottenTask,
    setGottenTask,
    seconds,
    setSeconds,
    minutes,
    setMinutes,
  } = useTask();
  return (
    <div>
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="gamegobody">
        {props.clicked === false ? (
          <h2 className="title">Give me a random task!</h2>
        ) : (
          <h2 className="title">Your next task is...</h2>
        )}
        {/* How to change the pivot point of the image spinning?*/}
        <button
          id="a"
          className="applebtn"
          type="button"
          onClick={props.onClick}
          value="Click"
        >
          <img
            id="applebtnimage"
            className="applebtnimage"
            src={appleColor}
            alt="red apple"
          />
        </button>
        <div className="start">{props.counter}</div>
      </div>
      {props.clicked === true && (
        <div className="gottentask">
          <h4>{props.gottenTask.taskName}</h4>
        </div>
      )}
    </div>
  );
}
