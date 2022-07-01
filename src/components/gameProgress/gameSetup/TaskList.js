import TaskMini from "./minifiedTask";
import { getAllTasks } from "../../../fetchDB/fetchDB";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext.js";

export default function TaskList({
  filterSelection,
  searchValue,
  sortByFavorite,
  sortByComplete,
}) {
  // console.log(searchValue);
  // const [allTasks, setAllTasks] = useState(false);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const { user, allTasks } = useTask();

  // This is how to get around derived state, just for reference if that's what I happen to be doing...
  // const favoriteTasks = user.find((user) => {
  //   return user.id === selectedUserId;
  // });

  // Get all tasks (server route '/') from the DB, make the order random and store in state
  // Here because this is the only place in the app that displays all tasks, so storing in context
  // is unnecessary data being distributed to the whole of the app.
  useEffect(() => {
    // Get all tasks in random order
    // getAllTasks().then((allData) => {
    //   setAllTasks(
    //     allData.sort((a, b) => {
    //       return Math.random() >= 0.5 ? 1 : -1;
    //     })
    //   );
    // setTasksFiltered(allData);
    //!!! If time allows, order the task categories by the reverse order in which they were
    // inputted in the array (last category selection shows first in list)
    // setTasksFiltered(allData.sort((a,b) => {
    //   const filterSelectionOrder = filterSelection
    // }));
    // });
  }, []);

  // This useEffect checks the filter array and filters the displayed tasks to show only the tasks
  // whose category match the category selected in the filter (in parent component)
  useEffect(() => {
    // ??? When filterSelection is an empty array, it (correctly) considers filterSelection.length = 0
    // ??? and yet filterSelection === [] is false. Wth, why???
    // console.log(filterSelection);
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
  }, [allTasks, filterSelection]);

  // Sorts all tasks by favorite (based on user settings)
  useEffect(() => {
    // console.log(sortByFavorite);
    if (!sortByFavorite) setTasksFiltered(allTasks);
    if (sortByFavorite) {
      const sortFav = [...allTasks].sort((a, b) =>
        user.favoriteList._id === a.taskId ? -1 : 1
      );
      setTasksFiltered(sortFav);
    }
  }, [sortByFavorite]);

  // Sorts all tasks by completion (based on user's daily progress)
  useEffect(() => {
    // console.log(sortByComplete);
    if (!sortByComplete) setTasksFiltered(allTasks);
    if (sortByComplete) {
      const sortComp = [...allTasks].sort((a, b) =>
        user.todayCompleted._id === a.taskId ? -1 : 1
      );
      setTasksFiltered(sortComp);
    }
  }, [sortByComplete]);

  // !!! WIP: functioning search feature comes here:

  return (
    allTasks &&
    console.log(tasksFiltered) && (
      <div className="taskWrapper">
        {/* {console.log("These are the favorites:")} */}
        {/* {console.log(favoriteList)} */}
        {/* {console.log(user.todayList)} */}
        {/* {console.log(user.todaySuccess)} */}
        {/* {console.log(user.todayFailed)} */}
        {allTasks.map((task, index) => (
          <TaskMini key={index} task={task} user={user} />
        ))}
      </div>
    )
  );
}
