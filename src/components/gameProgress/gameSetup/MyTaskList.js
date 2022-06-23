import MyList from "./myList";
import pets from "./mockanimalsDB";
import reload from "../../../images/change-icon.png";
import renderApples from "../../../utils/generateApples";
import { getUser } from "../../../fetchDB/fetchDB";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MyTaskList() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser("62b1b57082c8ed601e7094fc").then((userData) => {
      // setDisplayedTasks(userData);
      setUser(userData);
    });
  }, []);

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
        <MyList />
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
          <div className="appleWrapper">
            {renderApples(pets[1].hungerlevel, "appleIcon")}
          </div>
        </div>
        <div className="navWrapper">
          <button type="button" className="fadedBtn">
            <Link to="/alltasks">Task selection</Link>
          </button>
          {/* <button type="button" className="fadedBtn">
            Custom tasks
          </button> */}
          <button type="button" className="mainBtn">
            <Link to="/petselection">Pick pet</Link>
          </button>
        </div>
        <Outlet />
      </footer>
    </>
  );
}
