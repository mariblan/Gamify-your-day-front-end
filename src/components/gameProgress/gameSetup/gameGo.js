import appleColor from "../../../images/apple-color.png";
import "./gameGo.css";
import { useTask } from "../../../taskContext";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

export default function GameGo({ getTask, counter, clicked }) {
  // console.log(props);
  const {
    selectedPet,
    setSelectedPet,
    userSettings,
    todaysList,
    setTodaysList,
    gottenTask,
    forfeited,
    setForfeited,
  } = useTask();
  // console.log(selectedPet);
  const navigate = useNavigate();
  const focusBtn = useRef(null);
  return (
    // console.log(forfeited) || (
    <div>
      {/* {console.log(gottenTask)} */}
      <button
        onClick={() => {
          setTimeout(navigate("../mytasks"), 150);
        }}
        className="menu"
        type="menu"
      >
        My list
      </button>
      <div className="gamegobody">
        {clicked === false ? (
          <h2 className="title">Give me a random task!</h2>
        ) : (
          <h2 className="title">Your next task is...</h2>
        )}
        <button
          ref={focusBtn}
          id="a"
          className={userSettings.length === 0 ? "applebtnnotask" : "applebtn"}
          type="button"
          onClick={getTask}
          value="Click"
        >
          <img
            id="applebtnimage"
            className="applebtnimage"
            src={appleColor}
            alt="red apple"
          />
        </button>
        <div
          onClick={() => {
            getTask();
            focusBtn.current.focus();
          }}
          className="start"
        >
          {counter}
        </div>
      </div>
      {clicked === true && (
        <div className="gottentask">
          <h4>{gottenTask.taskName}</h4>
        </div>
      )}
    </div>
  );
}
