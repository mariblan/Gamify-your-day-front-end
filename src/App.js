import "./App.css";
import { Routes, Route } from "react-router-dom";
import AllTasks from "./components/gameProgress/gameSetup/fullTaskList";
import AnimalSelection from "./components/gameProgress/gameSetup/animalSelection";
import TaskTimer from "./components/gameProgress/timer/taskTimer";
import MyTaskList from "./components/gameProgress/gameSetup/myTaskList";
import TaskSuccess from "./components/gameProgress/timer/taskSuccess";
import TaskFailure from "./components/gameProgress/timer/taskFailure";

function App() {
  return (
    <Routes>
      <Route path="alltasks" element={<AllTasks />} />
      <Route path="mytasks" element={<MyTaskList />} />
      <Route path="petselection" element={<AnimalSelection />} />
      <Route path="tasktimer" element={<TaskTimer />} />
      <Route path="tasksuccess" element={<TaskSuccess />} />
      <Route path="taskfailure" element={<TaskFailure />} />
    </Routes>
  );
}

export default App;
