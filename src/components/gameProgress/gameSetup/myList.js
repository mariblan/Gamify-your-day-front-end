import TaskMini from "./minifiedTask";
import TaskExpanded from "./expandedTask";
import { taskDB, userDB } from "./mockTaskDB";
import { useState, useEffect } from "react";

// If tasklist is rendered in fulltasklist, no taskexpanded components are called
// if tasklist is rendered in mytasklist, only one taskexpanded component can be called

export default function MyList() {
  // filter category will take the tasbDB mock and the filter name (if any) and return only objects
  // that match the filtering
  // console.log(searchValue);
  const allTasks = [...taskDB];
  const [displayedTasks, setDisplayedTasks] = useState([]);

  // !!! WIP: functioning search feature comes here:

  return (
    <div className="taskWrapper">
      {/* !!! Very placeholder component call for the sake of visibility - needs to be called on click* */}
      <TaskExpanded task={taskDB[3]} user={userDB[0]} />
      {
        /* {(displayedTasks &&
          displayedTasks.map((task, index) => (
            <TaskMini key={index} task={task} user={userDB[0]} />
          ))) || */
        displayedTasks.map((task, index) => (
          <TaskMini key={index} task={task} user={userDB[0]} />
        ))
      }
    </div>
    // <div className="taskWrapper">
    //   {taskDB.map((task, index) => (
    //     <TaskMini key={index} task={task} user={userDB[0]} />
    //   ))}
    // </div>
  );
}
