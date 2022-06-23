import { createContext, useState, useContext, useEffect } from "react";
import { getUser } from "./fetchDB/fetchDB";

const TaskContext = createContext();

const useTask = () => useContext(TaskContext);

const TaskProvider = (props) => {
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
