import MyList from "./myList";
import reload from "../../../images/change-icon.png";
import renderApples from "../../../utils/generateApples";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useTask } from "../../../taskContext";
import { toast } from "react-toastify";
import { confirm } from "react-confirm-box";

export default function MyTaskList() {
  const {
    user,
    userProgress,
    todaysList,
    selectedPet: { name, mood, hungerlevel },
    nextClicked,
    canChangePet,
    setCanChangePet,
    setNextClicked,
    toastErrorSettings,
    logOutConfirm,
  } = useTask();
  const navigate = useNavigate();

  useEffect(() => {
    clearTimeout();
  }, []);

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className="react-confirm-box">
          <h4>
            Once you start the game you won't be able to select a different pet
            later on. Would you like to continue?
          </h4>
          <div className="confirm-box-btnWrapper">
            <button onClick={() => onCancel()}>Back</button>
            <button
              onClick={() => {
                onConfirm();
                setNextClicked(true);
                setTimeout(() => navigate("../gamego"), 150);
                setCanChangePet(false);
              }}
            >
              Start!
            </button>
          </div>
        </div>
      );
    },
  };

  // Sets the trigger for the values of each task in the today
  // to be stored and be passable to the task randomizer
  const giveSignal = async () => {
    if (todaysList.length === 0) {
      toast.error(
        "Please select at least one task before proceeding!",
        toastErrorSettings
      );
    } else {
      if (canChangePet) await confirm("Start the game?", options);
      else {
        setNextClicked(true);
        setTimeout(() => navigate("../gamego"), 150);
      }
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
      <div className="headerWrapper">
        <h1 className="userWelcome">Welcome back {user.name}!</h1>
        <button className="profileBtn fadedBtn" onClick={() => logOutConfirm()}>
          Log out
        </button>
        <h1 className="title">Today's task list</h1>
      </div>
      <div className="hidden">
        <h1 className="userWelcome">Welcome back {user.name}!</h1>
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
              src={mood ? mood[0] : `No pet selected`}
              alt={`A ${name}` || `No pet selected`}
              className="animal"
            />
            {canChangePet && (
              <div className="changeAnimal">
                <img
                  src={reload}
                  alt="A reload icon"
                  onClick={navigateToPets}
                />
              </div>
            )}
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
