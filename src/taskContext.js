import "./components/gameProgress/timer/timer.css";
import { createContext, useState, useContext, useEffect } from "react";
import {
  getAllTasks,
  addToProgress,
  clearFailed,
  clearSuccess,
  clearToday,
  clearCompleted,
} from "./fetchDB/fetchDB";
import { confirm } from "react-confirm-box";
import { useNavigate, Navigate } from "react-router-dom";
import canaryNorm from "./images/canary-normal.png";
import canaryHappy from "./images/canary-happy.png";
import canarySad from "./images/canary-sad.png";
import hamsterNorm from "./images/hamster-normal.png";
import hamsterHappy from "./images/hamster-happy.png";
import hamsterSad from "./images/hamster-sad.png";
import tortoiseNorm from "./images/tortoise-normal.png";
import tortoiseHappy from "./images/tortoise-happy.png";
import tortoiseSad from "./images/tortoise-sad.png";

const TaskContext = createContext();

const useTask = () => useContext(TaskContext);

const TaskProvider = ({
  isAuthenticated,
  setIsAuthenticated,
  user,
  toastErrorSettings,
  token,
  setToken,
  setUser,
  children,
}) => {
  //Pets are not in database so here we have all the info needed in the games so it can be passed down to
  //the right components and be used to select the selectedPet.
  const pets = [
    {
      petId: 1,
      name: "tortoise",
      classname: "petbtn",
      petClicked: false,
      btn: "tortoisebtn",
      hungerlevel: 2,
      mood: [tortoiseNorm, tortoiseHappy, tortoiseSad],
      completion:
        "The tortoise chomps happily on a couple of apples. You've done well for today!",
    },
    {
      petId: 2,
      name: "canary",
      classname: "petbtn",
      petClicked: false,
      btn: "canarybtn",
      hungerlevel: 4,
      mood: [canaryNorm, canaryHappy, canarySad],
      completion:
        "The canary sings joyfully, satisfied! You've done an amazing job!",
    },
    {
      petId: 3,
      name: "hamster",
      classname: "petbtn",
      petClicked: false,
      btn: "hamsterbtn",
      hungerlevel: 8,
      mood: [hamsterNorm, hamsterHappy, hamsterSad],
      completion:
        "After so many apples, the hamster seems to be finally full as it snoozes peacefully. It wasn't easy but you did it!",
    },
  ];

  //The options for the setup of the log out confirm box and the functions of its buttons.
  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className="react-confirm-box">
          <h4>
            If you log out you will lose all your progress and personalised
            tasks. Are you sure you want to proceed?
          </h4>
          <div className="confirm-box-btnWrapper">
            <button
              onClick={() => {
                onConfirm();
                setDisabled(false);
                return logOut();
              }}
            >
              Logout
            </button>
            <button
              onClick={() => {
                onCancel();
                setDisabled(false);
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    },
  };
  //This makes the confirmation box to pop out so you can decide befrore logging out, and upon confirmation runs the logOut function, which
  //sets the game to the initial state.
  const logOutConfirm = async () => {
    if (todaysList.length > 0 || todaysCompleted.length > 0) {
      await confirm("Are you sure?", options);
    } else if (todaysList.length === 0 && todaysCompleted.length === 0) {
      logOut();
    }
  };

  const logOut = () => {
    addToProgress(user._id, 0);
    setUserProgress(0);
    clearToday(user._id);
    setTodaysCompleted([]);
    clearCompleted(user._id);
    setUserSettings([]);
    setTodaysList([]);
    setGottenTask({
      category: "",
      taskdescription: "",
      difficulty: "",
      taskid: 0,
      taskName: "",
      taskTime: {},
    });
    clearFailed(user._id);
    setTodaysFailed([]);
    clearSuccess(user._id);
    setTodaysSuccess([]);
    setSelectedPet(false);
    setCanChangePet(true);
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setToken("");
    setUser(null);
    setTimeout(() => <Navigate to={"../login"} />, 150);
  };

  //Fetching the generic task from database and setting them to display in a different order
  //each time.

  const [allTasks, setAllTasks] = useState(false);
  useEffect(() => {
    getAllTasks().then((allData) => {
      setAllTasks(
        allData.sort((a, b) => {
          return Math.random() >= 0.5 ? 1 : -1;
        })
      );
    });
  }, []);

  //If turns to true upon clicking start in the my list component, so the settings of personalized tasks can be added
  //to the userSettings. It turns to back to false in the failure and success screens.
  const [nextClicked, setNextClicked] = useState(false);

  //To pass the infor of the selected pet to the timer components
  const [selectedPet, setSelectedPet] = useState(false);

  //To establish that the pet cannot be change once the game starts.
  const [canChangePet, setCanChangePet] = useState(true);

  //Thisn passes the array of randomize task through the app
  const [userSettings, setUserSettings] = useState([]);

  // Setting the info from the database in different lists
  const [favoriteList, setFavoriteList] = useState(false);
  useEffect(() => {
    user && setFavoriteList(user.favoriteList);
  }, [user]);

  //Settings the todayList of the database to the front end todaysList
  const [todaysList, setTodaysList] = useState([]);
  useEffect(() => {
    user && setTodaysList(user.todayList);
  }, [user]);

  //Settings the todayCompleted of the database to the front end todaysCompleted
  const [todaysCompleted, setTodaysCompleted] = useState([]);
  useEffect(() => {
    user && setTodaysCompleted(user.todayCompleted);
  }, [user]);

  //Settings the todayFailed of the database to the front end todaysFailed
  const [todaysFailed, setTodaysFailed] = useState([]);
  useEffect(() => {
    user && setTodaysFailed(user.todayFailed);
  }, [user]);

  //Settings the todaySuccess of the database to the front end todaysSuccess
  const [todaysSuccess, setTodaysSuccess] = useState([]);
  useEffect(() => {
    user && setTodaysSuccess(user.todayFailed);
  }, [user]);

  //Sets the userProgress to pass it througout the app and render the proper progres in the right place
  //and to send this progress back to the database
  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    user && setUserProgress(user.progress);
  }, [user]);

  //This sets the values presented by the task that we get randomly in the game
  // const [gottenTask, setGottenTask] = useState({
  //   category: "",
  //   reward: 0,
  //   difficulty: "",
  //   sliderValue: 0,
  //   taskid: 0,
  //   taskName: "",
  // });
  const [gottenTask, setGottenTask] = useState(null);
  //The values for the timer component so it can be passed through the success and failure screens and render
  //how long it took the person to do the task.
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //Disables the buttons uppon click when a confirm box is open, so the user cannot go to another screen until the
  //confirm box has been closed.
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, []);

  //This sets if the task is forfeited so the failures screen can send the right info to the array.
  const [forfeited, setForfeited] = useState(false);

  //This allows the game to know when to redirect the player to the final screen
  const [gameFinalScreen, setGameFinalScreen] = useState(true);

  const [breakInterval, setBreakInterval] = useState(false);

  const [counter, setCounter] = useState("Start!");
  return (
    <TaskContext.Provider
      value={{
        counter,
        setCounter,
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        logOutConfirm,
        toastErrorSettings,
        allTasks,
        pets,
        selectedPet,
        setSelectedPet,
        canChangePet,
        setCanChangePet,
        nextClicked,
        setNextClicked,
        user,
        userProgress,
        setUserProgress,
        favoriteList,
        setFavoriteList,
        todaysList,
        setTodaysList,
        userSettings,
        setUserSettings,
        todaysCompleted,
        setTodaysCompleted,
        todaysSuccess,
        setTodaysSuccess,
        todaysFailed,
        setTodaysFailed,
        gottenTask,
        setGottenTask,
        minutes,
        setMinutes,
        seconds,
        setSeconds,
        forfeited,
        setForfeited,
        gameFinalScreen,
        setGameFinalScreen,
        disabled,
        setDisabled,
        breakInterval,
        setBreakInterval,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export { useTask, TaskContext, TaskProvider };
