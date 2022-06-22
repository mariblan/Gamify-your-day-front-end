import { createContext, useState, useMemo } from "react";

const TaskContext = createContext();

const TaskProvider = (props) => {
  const [gottenTask, setGottenTask] = useState({
    category: "",
    taskdescription: "",
    taskid: 0,
    taskName: "",
    taskTime: {},
  });
  const value = useMemo(() => ({ gottenTask, setGottenTask }), [gottenTask]);

  return (
    <TaskContext.TaskProvider value={value}>
      {props.children}
    </TaskContext.TaskProvider>
  );
};
export { TaskContext, TaskProvider };
