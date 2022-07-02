import TaskMini from "./minifiedTask";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext.js";

export default function TaskList({
  filterSelection,
  // searchValue,
  sortByFavorite,
  // sortByComplete,
}) {
  // console.log(searchValue);
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const { user, allTasks } = useTask();

  // Get all tasks (server route '/') from the DB, make the order random and store in state
  // Here because this is the only place in the app that displays all tasks, so storing in context
  // is unnecessary data being distributed to the whole of the app.
  useEffect(() => {
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
    if (!sortByFavorite) setTasksFiltered(allTasks);
    if (sortByFavorite) {
      const favoriteIds = user.favoriteList.map((favTask) => {
        return favTask._id;
      });
      const sortFavs = [...allTasks].sort((a, b) => {
        return favoriteIds.includes(a._id) ? -1 : 1;
      });
      setTasksFiltered(sortFavs);
    }
  }, [sortByFavorite]);

  // Sorts all tasks by completion (based on user's daily progress)
  // useEffect(() => {
  //   // console.log(sortByComplete);
  //   if (!sortByComplete) setTasksFiltered(allTasks);
  //   if (sortByComplete) {
  //     const sortComp = [...allTasks].sort((a, b) =>
  //       user.todayCompleted._id === a.taskId ? -1 : 1
  //     );
  //     setTasksFiltered(sortComp);
  //   }
  // }, [sortByComplete]);

  // !!! WIP: functioning search feature comes here:

  return (
    // Console.logging is making it not render the rest of the component. Wth???
    allTasks &&
    tasksFiltered && (
      <div className="taskWrapper">
        {/* {console.log("These are the favorites:")} */}
        {/* {console.log(favoriteList)} */}
        {/* {console.log(user.todayList)} */}
        {/* {console.log(user.todaySuccess)} */}
        {/* {console.log(user.todayFailed)} */}
        {tasksFiltered.map((task, index) => (
          <TaskMini key={index} task={task} user={user} />
        ))}
      </div>
    )
    // )
  );
}
