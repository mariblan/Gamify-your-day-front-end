import MyList from "./myList";
import pets from "./mockanimalsDB";
import reload from "../../../images/change-icon.png";
import renderApples from "../../../utils/generateApples";
import { getUser } from "../../../fetchDB/fetchDB";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTask } from "../../../taskContext";
import { toast } from "react-toastify";

export default function MyTaskList() {
  // const [user, setUser] = useState([]);
  const {
    userProgress,
    todaysList,
    selectedPet,
    selectedPet: { name, mood, hungerlevel },
    nextClicked,
    setNextClicked,
    toastErrorSettings,
    logOut,
  } = useTask();
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout();
  }, []);

  // Sets the trigger for the values of each task in the today
  // to be stored and be passable to the task randomizer
  const giveSignal = async () => {
    if (todaysList.length === 0) {
      toast.error(
        "Please select at least one task before proceeding!",
        toastErrorSettings
      );
    } else {
      await setNextClicked(true);
      setTimeout(() => navigate("../gamego"), 150);
    }
  };

  const navigateToTasks = () => {
    setTimeout(() => navigate("../alltasks"), 150);
  };

  const navigateToPets = () => {
    setTimeout(() => navigate("../petselection"), 150);
  };

  return (
    <>
      {console.log(userProgress)}
      <div className="headerWrapper">
        <button className="profileBtn fadedBtn" onClick={() => logOut()}>
          Log out
        </button>
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
