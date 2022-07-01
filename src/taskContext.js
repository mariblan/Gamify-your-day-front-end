import { createContext, useState, useContext, useEffect } from "react";
import { getAllTasks } from "./fetchDB/fetchDB";
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
  logOut,
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

  const [selectedPet, setSelectedPet] = useState(false);

  // const [currentUser, setCurrentUser] = useState(false);
  // useEffect(() => {
  //   user && getUser(user._id).then((user) => setCurrentUser(user));
  // }, [user]);

  const [favoriteList, setFavoriteList] = useState(false);

  useEffect(() => {
    user && setFavoriteList(user.favoriteList);
    // console.log(favoriteList);
  }, [user]);

  const [userSettings, setUserSettings] = useState([]);

  const [todaysList, setTodaysList] = useState([]);
  useEffect(() => {
    user && setTodaysList(user.todayList);
    // console.log(todaysList);
  }, [user]);

  const [todaysCompleted, setTodaysCompleted] = useState([]);
  useEffect(() => {
    user && setTodaysCompleted(user.todayCompleted);
    //console.log(todaysCompleted);
  }, [user]);

  const [todaysFailed, setTodaysFailed] = useState([]);
  useEffect(() => {
    user && setTodaysFailed(user.todayFailed);
    //console.log(todaysFailed);
  }, [user, todaysFailed]);

  const [todaysSuccess, setTodaysSuccess] = useState([]);
  useEffect(() => {
    user && setTodaysFailed(user.todayFailed);
    //console.log(todaysFailed);
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

  return (
    <TaskContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        token,
        setToken,
        logOut,
        toastErrorSettings,
        allTasks,
        pets,
        selectedPet,
        setSelectedPet,
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
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
export { useTask, TaskContext, TaskProvider };
