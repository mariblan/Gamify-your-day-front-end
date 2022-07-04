import "./components/gameProgress/timer/timer.css";
import { createContext, useState, useContext, useEffect } from "react";
import {
  getAllTasks,
  addToProgress,
  clearFailed,
  clearSuccess,
  clearToday,
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
                logOut();
              }}
            >
              Logout
            </button>
            <button
              onClick={() => {
                onCancel();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      );
    },
  };

  const logOutConfirm = async () => {
    if (user.todayList.length > 0) await confirm("Are you sure?", options);
    return logOut();
  };

  const logOut = () => {
    addToProgress(user._id, 0);
    setUserProgress(0);
    clearToday(user._id);
    setTodaysList([]);
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

  const navigate = useNavigate();

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

  const [nextClicked, setNextClicked] = useState(false);

  const [selectedPet, setSelectedPet] = useState(false);

  const [canChangePet, setCanChangePet] = useState(true);

  const [favoriteList, setFavoriteList] = useState(false);

  useEffect(() => {
    user && setFavoriteList(user.favoriteList);
  }, [user]);

  const [userSettings, setUserSettings] = useState([]);

  const [todaysList, setTodaysList] = useState([]);
  useEffect(() => {
    user && setTodaysList(user.todayList);
  }, [user]);

  const [todaysFailed, setTodaysFailed] = useState([]);
  useEffect(() => {
    user && setTodaysFailed(user.todayFailed);
  }, [user, todaysFailed]);

  const [todaysSuccess, setTodaysSuccess] = useState([]);
  useEffect(() => {
    user && setTodaysFailed(user.todayFailed);
  }, [user, todaysFailed]);

  const [userProgress, setUserProgress] = useState(0);

  useEffect(() => {
    user && setUserProgress(user.progress);
  }, [user]);

  const [gottenTask, setGottenTask] = useState({
    category: "",
    taskdescription: "",
    taskid: 0,
    taskName: "",
    taskTime: {},
  });
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [forfeited, setForfeited] = useState(false);
  const [gameFinalScreen, setGameFinalScreen] = useState(true);
  return (
    <TaskContext.Provider
      value={{
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
        navigate,
        user,
        userProgress,
        setUserProgress,
        favoriteList,
        setFavoriteList,
        todaysList,
        setTodaysList,
        userSettings,
        setUserSettings,
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export { useTask, TaskContext, TaskProvider };
