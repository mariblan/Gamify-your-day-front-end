import MyList from "./myList";
import pets from "./mockanimalsDB";
import reload from "../../../images/change-icon.png";
import renderApples from "../../../utils/generateApples";
import { getUser } from "../../../fetchDB/fetchDB";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTask } from "../../../taskContext";

export default function MyTaskList() {
  // const [user, setUser] = useState([]);
  const [nextClicked, setNextClicked] = useState(false);
  const {
    userProgress,
    selectedPet,
    selectedPet: { name, mood, hungerlevel },
  } = useTask();
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout();
  }, []);

  // Sets the trigger for the values of each task in the today
  // to be stored and be passable to the task randomizer
  const giveSignal = async () => {
    await setNextClicked(true);
    setTimeout(() => navigate("../gamego"), 150);
  };

  const navigateToTasks = () => {
    setTimeout(() => navigate("../alltasks"), 150);
  };

  const navigateToPets = () => {
    setTimeout(() => navigate("../petselection"), 150);
  };

  return (
    <>
      {/* {console.log(selectedPet)} */}
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
            <img
              src={selectedPet ? selectedPet.mood[0] : undefined}
              alt={`A ${name}` || `A canary`}
              className="animal"
            />
            <div className="changeAnimal">
              <img src={reload} alt="A reload icon" onClick={navigateToPets} />
            </div>
          </div>
          <div className="appleWrapper">
            {renderApples("appleIcon", userProgress, hungerlevel)}
          </div>
        </div>
        <div className="navWrapper">
          <button type="button" className="fadedBtn" onClick={navigateToTasks}>
            Task selection
          </button>
          {/* <button type="button" className="fadedBtn">
            Custom tasks
          </button> */}
          <button type="button" className="mainBtn" onClick={giveSignal}>
            Start!
          </button>
        </div>
      </footer>
    </>
  );
}
