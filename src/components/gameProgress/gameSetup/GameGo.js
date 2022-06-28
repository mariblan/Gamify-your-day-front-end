import appleColor from "../../../images/apple-color.png";
import "./gameGo.css";
import { useTask } from "../../../taskContext";
import { useNavigate } from "react-router-dom";

export default function GameGo(props) {
  console.log(props);
  const {
    selectedPet,
    setSelectedPet,
    userSettings,
    todaysList,
    setTodaysList,
    gottenTask,
    setGottenTask,
  } = useTask();
  console.log(selectedPet);
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          setTimeout(navigate("/mytasks"), 150);
        }}
        className="menu"
        type="menu"
      >
        My list
      </button>
      <div className="gamegobody">
        {props.clicked === false ? (
          <h2 className="title">Give me a random task!</h2>
        ) : (
          <h2 className="title">Your next task is...</h2>
        )}
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
