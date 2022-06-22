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

  return (
    <TaskContext.Provider value={{ gottenTask, setGottenTask }}>
      {props.children}
    </TaskContext.Provider>
  );
};
export { useTask, TaskContext, TaskProvider };
