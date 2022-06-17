import { TaskExpanded, TaskMini } from "./singleTask";
import { taskDB, userDB } from "./mockTaskDB";
import { useState, useEffect } from "react";

// If tasklist is rendered in fulltasklist, no taskexpanded components are called
// if tasklist is rendered in mytasklist, only one taskexpanded component can be called

export default function TaskList({ fullList, filter }) {
  // filter category will take the tasbDB mock and the filter name (if any) and return only objects
  // that match the filtering
  const [filteredTasks, setFilteredTasks] = useState(taskDB);
  // const [filteredDB, setFilteredDB] = useState([]);

  const filterCategory = (allTasks, filter) => {
    // we have an empty array that will return the db filtered by category.
    // once a filter change kicks in, a method will iterate through the array and populate it with
    // tasks that have the same name as the filter.
    console.log(filter);
    if (filter) {
      setFilteredTasks(allTasks.filter((task) => task.category === filter));
    }
  };

  useEffect(() => {
    setFilteredTasks(filterCategory(filteredTasks, filter));
  }, [filteredTasks]);

  return (
    <div className="taskWrapper">
      {!fullList && <TaskExpanded task={taskDB[3]} user={userDB[0]} />}
      {filteredTasks.map((task, index) => (
        <TaskMini key={index} task={task} user={userDB[0]} />
      ))}
    </div>
    // <div className="taskWrapper">
    //   {taskDB.map((task, index) => (
    //     <TaskMini key={index} task={task} user={userDB[0]} />
    //   ))}
    // </div>
  );
}
