import appleColor from "../../../images/apple-color.png";
import "./gameGo.css";

export default function GameGo() {
  function spinninghandleClick() {
    document.getElementById("applebtnimage").className = "classname";
  }
  return (
    <div>
      <button className="menu" type="menu">
        Menu
      </button>
      <div className="gamegobody">
        <h2 className="title">Give me a random task!</h2>
        <button
          id="a"
          className="applebtn"
          type="button"
          onclick={spinninghandleClick}
          value="Click"
        >
          <img
            id="applebtnimage"
            className="applebtnimage"
            src={appleColor}
            alt="red apple"
          />
        </button>
      </div>
    </div>
  );
}
