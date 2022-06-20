import TaskMini from "./minifiedTask";
import { taskDB, userDB } from "./mockTaskDB";
import { useState, useEffect } from "react";

// If tasklist is rendered in fulltasklist, no taskexpanded components are called
// if tasklist is rendered in mytasklist, only one taskexpanded component can be called

export default function TaskList({
  filterSelection,
  searchValue,
  sortByFavorite,
  sortByComplete,
}) {
  // filter category will take the tasbDB mock and the filter name (if any) and return only objects
  // that match the filtering
  // console.log(searchValue);
  const allTasks = [...taskDB];
  const [displayedTasks, setDisplayedTasks] = useState([]);

  // !!! MyTaskList is not rendering with this component because of filterSelection being undefined
  // in this case. Find a way around.
  useEffect(() => {
    // ??? When filterSelection is an empty array, it (correctly) considers filterSelection.length = 0
    // ??? and yet filterSelection === [] is false. Wth, why???
    if (filterSelection.length >= 1) {
      const filteredTasks = allTasks.filter((task) =>
        filterSelection.includes(task.category)
      );
      setDisplayedTasks(filteredTasks);
    } else {
      setDisplayedTasks(allTasks);
    }
  }, [filterSelection]);

  useEffect(() => {}, [sortByFavorite]);
  useEffect(() => {}, [sortByComplete]);

  // !!! WIP: functioning search feature comes here:

  // Sort displayed tasks by completion
  return (
    <div className="taskWrapper">
      {displayedTasks.map((task, index) => (
        <TaskMini key={index} task={task} user={userDB[0]} />
      ))}
    </div>
  );
}
