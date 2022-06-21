import TaskMini from "./minifiedTask";
import getTasks from "../../../fetchDB/fetchDB";
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
  const [allTasks, setAllTasks] = useState(false);
  // const allTasks = [...taskDB];
  const [tasksFiltered, setTasksFiltered] = useState([]);

  const expandTask = (node) => {
    console.log(node);
    console.log(`I've been clicked!`);
  };

  useEffect(() => {
    (async () => setAllTasks(await getTasks()))();
  }, []);

  // !!! MyTaskList is not rendering with this component because of filterSelection being undefined
  // in this case. Find a way around.
  useEffect(() => {
    // ??? When filterSelection is an empty array, it (correctly) considers filterSelection.length = 0
    // ??? and yet filterSelection === [] is false. Wth, why???
    // filterSelection === [] ? console.log(true) : console.log(false);
    if (filterSelection.length >= 1) {
      const filterTasks = [...allTasks];
      const filteredTasks = filterTasks.filter((task) =>
        filterSelection.includes(task.category)
      );
      setTasksFiltered(filteredTasks);
    } else {
      setTasksFiltered(allTasks);
    }
  }, [filterSelection]);

  // Sorts all tasks by favorite (based on user settings)
  useEffect(() => {
    if (!sortByFavorite) setTasksFiltered(allTasks);
    if (sortByFavorite) {
      const sortFav = [...taskDB].sort((a, b) =>
        userDB[0].favoriteTasks.includes(a.taskId) ? -1 : 1
      );
      setTasksFiltered(sortFav);
    }
  }, [sortByFavorite]);

  // Sorts all tasks by completion (based on user's daily progress)
  useEffect(() => {
    if (!sortByComplete) setTasksFiltered(allTasks);
    if (sortByComplete) {
      const sortComp = [...taskDB].sort((a, b) =>
        userDB[0].todayCompleted.includes(a.taskId) ? -1 : 1
      );
      setTasksFiltered(sortComp);
    }
  }, [sortByComplete]);

  // !!! WIP: functioning search feature comes here:

  return (
    allTasks && (
      <div className="taskWrapper">
        {allTasks.map((task, index) => (
          <TaskMini
            key={index}
            task={task}
            user={userDB[0]}
            expand={expandTask}
          />
        ))}
      </div>
    )
  );
}
