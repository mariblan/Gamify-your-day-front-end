import appleColor from "../../../images/apple-color.png";
import "./gameGo.css";

export default function GameGo(props) {
  console.log(props);
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
