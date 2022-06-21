import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AllTasks from "./components/gameProgress/gameSetup/fullTaskList";
import AnimalSelection from "./components/gameProgress/gameSetup/animalSelection";
import GetTask from "./components/gameProgress/timer/getTask";
import TaskTimer from "./components/gameProgress/timer/taskTimer";
import MyTaskList from "./components/gameProgress/gameSetup/myTaskList";
import TaskSuccess from "./components/gameProgress/timer/taskSuccess";
import TaskFailure from "./components/gameProgress/timer/taskFailure";
import { TaskContext } from "./components/gameProgress/timer/taskContext";
import { useState } from "react";

function App() {
  const [gottenTask, setGottenTask] = useState({
    category: "",
    taskdescription: "",
    taskid: 0,
    taskName: "",
    taskTime: {},
  });
  return (
    <TaskContext.Provider value={{ gottenTask, setGottenTask }}>
      <Router>
        <Routes>
          <Route path="alltasks" element={<AllTasks />} />
          <Route path="mytasks" element={<MyTaskList />} />
          <Route path="petselection" element={<AnimalSelection />} />
          <Route path="gamego" element={<GetTask />} />
          <Route path="tasktimer" element={<TaskTimer />} />
          <Route path="tasksuccess" element={<TaskSuccess />} />
          <Route path="taskfailure" element={<TaskFailure />} />
        </Routes>
      </Router>
    </TaskContext.Provider>
  );
}

export default App;
