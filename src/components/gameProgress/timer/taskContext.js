import { createContext, useState, useContext } from "react";

const TaskContext = createContext();

const useTask = () => useContext(TaskContext);

const TaskProvider = (props) => {
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
