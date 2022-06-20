import appleColor from "../../../images/apple-color.png";
import "./gameGo.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { taskDB } from "./mockTaskDB";

export default function GameGo() {
  const [counter, setCounter] = useState("Start!");
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  //const [countdownInit, setcountdownInit] = useState(3);
  function getTask() {
    const index = Math.floor(Math.random() * taskDB.length);
    //return arraytasks[index];
    console.log(taskDB[index].taskName);
    //setInterval();
    setClicked(true);
    setCounter(5);
    countDown();
    const taskGotten = taskDB[index].lastName;
    renderTaskGotten(taskGotten);
  }
  const renderTaskGotten = (taskGotten) => {
    const taskGottenOnClick = taskGotten;
    return (
      <div>
        <h4>{getTask}</h4>
      </div>
    );
  };
  const countDown = () => {
    let count = 5;
    const interval = setInterval(() => {
      if (count > 1) {
        setCounter((prevCounter) => prevCounter - 1);
        --count;
      } else {
        clearInterval(interval);
        setCounter("GO!");
        setTimeout(() => {
          navigate("/tasktimer");
        }, 1000);
      }
    }, 1000);
  };
  // const redirection = () => {
  //   setTimeout(()=> {
  //     if (redirect === true) {
  //       return <Navigate to="/tasktimer" />;
  //     }
  //   }, 3000);
  // }

  // console.log(counter);

  return (
    <div>
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="gamegobody">
        <h2 className="title">Give me a random task!</h2>
        {/* How to change the pivot point of the image spinning?*/}
        <button
          id="a"
          className="applebtn"
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
        <div className="start">{counter}</div>
      </div>
      {clicked === true && taskGotten}
    </div>
  );
}
