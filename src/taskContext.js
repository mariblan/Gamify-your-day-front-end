import { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "./fetchDB/fetchDB";
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

const TaskProvider = (props) => {
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
  const [selectedPet, setSelectedPet] = useState({});
  const [user, setUser] = useState({});
  useEffect(() => {
    // Getting the user is here for the time being, but it's likely best to save it in context/redux
    getUser("62b1b57082c8ed601e7094fc").then((user) => setUser(user));
  }, [setUser]);

  const [todaysList, setTodaysList] = useState([]);
  useEffect(() => {
    user && setTodaysList(user.todayList);
    //console.log(todaysList);
  }, [user, todaysList, setTodaysList]);

  const [todaysCompleted, setTodaysCompleted] = useState([]);
  useEffect(() => {
    user && setTodaysCompleted(user.todayCompleted);
    //console.log(todaysCompleted);
  }, [user, todaysCompleted, setTodaysCompleted]);

  const [todaysFailed, setTodaysFailed] = useState([]);
  useEffect(() => {
    user && setTodaysFailed(user.todayFailed);
    //console.log(todaysFailed);
  }, [user, todaysFailed, setTodaysFailed]);

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
        pets,
        selectedPet,
        setSelectedPet,
        user,
        setUser,
        todaysList,
        setTodaysList,
        todaysCompleted,
        setTodaysCompleted,
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
      {props.children}
    </TaskContext.Provider>
  );
};
export { useTask, TaskContext, TaskProvider };
