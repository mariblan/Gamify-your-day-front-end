import "./taskList.css";
import TaskList from "./taskList";
import { categories } from "../../../utils/categoryCheck";

export default function AllTasks() {
  return (
    <>
      <div className="headerWrapper">
        <button className="profileBtn">Profile</button>
        <h1 className="title">Select your tasks for today!</h1>
      </div>
      <div className="filterWrapper">
        <div className="filterCategory">{}</div>
        <div className="searchWrapper">
          <input type="text" placeholder="Search Task" />
          <button>Search(replace with icon)</button>
        </div>
      </div>
      <TaskList fullList={true} />

      <div className="navWrapper">
        <button type="button" className="taskList">
          All tasks
        </button>
        <button type="button" className="customTasks">
          Custom tasks
        </button>
        <button type="button" className="petPick mainBtn">
          Pick pet
        </button>
      </div>
    </>
  );
}
