import MyList from "./myList";
import pets from "./mockanimalsDB";
import reload from "../../../images/change-icon.png";
import renderApples from "../../../utils/generateApples";
import { getUser } from "../../../fetchDB/fetchDB";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyTaskList() {
  const [user, setUser] = useState([]);
  const [nextClicked, setNextClicked] = useState(false);

  useEffect(() => {
    getUser("62b1b57082c8ed601e7094fc").then((userData) => {
      setUser(userData);
    });
  }, []);

  // Sets the trigger for the values of each task in the today
  // to be stored and be passable to the task randomizer
  const giveSignal = () => {
    setNextClicked(true);
  };

  return (
    <>
      <div className="headerWrapper">
        <button className="profileBtn fadedBtn">Profile</button>
        <h1 className="title">Today's task list</h1>
      </div>
      <div className="hidden">
        <button className="profileBtn fadedBtn">Profile</button>
        <h1 className="title">Today's task list</h1>
      </div>
      <div className="fixedTaskWrapper">
        <MyList next={nextClicked} />
      </div>
      <footer>
        <div className="dailyPet">
          <h3>My pet for today</h3>
          <div className="imgWrapper">
            <img src={pets[1].mood[0]} alt="A canary" className="animal" />
            <div className="changeAnimal">
              <img src={reload} alt="A reload icon" />
            </div>
          </div>
          <div className="appleWrapper">{renderApples("appleIcon", 1, 4)}</div>
        </div>
        <div className="navWrapper">
          <button type="button" className="fadedBtn">
            <Link to="/alltasks">Task selection</Link>
          </button>
          {/* <button type="button" className="fadedBtn">
            Custom tasks
          </button> */}
          <button type="button" className="mainBtn" onClick={giveSignal}>
            <Link to="/petselection">Pick pet</Link>
            {/* Pick pet */}
          </button>
        </div>
        <Outlet />
      </footer>
    </>
  );
}
