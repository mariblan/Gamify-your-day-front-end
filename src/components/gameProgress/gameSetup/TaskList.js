import TaskMini from "./minifiedTask";
import { getAllTasks, getUser } from "../../../fetchDB/fetchDB";
import { useState, useEffect } from "react";
// import { useTask } from "../timer/taskContext";

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
  const [user, setUser] = useState(null);
  const [tasksFiltered, setTasksFiltered] = useState([]);

  // Get all tasks (server route '/') from the DB, make the order random and store in state
  useEffect(() => {
    // Getting the user is here for the time being, but it's likely best to save it in context/redux
    getUser("62b1b57082c8ed601e7094fc").then((user) => setUser(user));
    // Get all tasks in random order
    getAllTasks().then((allData) => {
      // setAllTasks(
      //   allData.sort((a, b) => {
      //     return Math.random() >= 0.5 ? 1 : -1;
      //   })
      // );
      setAllTasks(allData);
      setTasksFiltered(allData);
      //!!! If time allows, order the task categories by the reverse order in which they were
      // inputted in the array (last category selection shows first in list)
      // setTasksFiltered(allData.sort((a,b) => {
      //   const filterSelectionOrder = filterSelection
      // }));
    });
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
    //   /*
    //   For reference fav tasks on the user are:
    //   Do the dishes id 62b1b21207f92f43f06dae3c
    //   Send an email id 62b1b900b8fd5e697e14516a
    //   Prepare a presentation id 62b1bd8eb8fd5e697e145170
    //   Check in with your parent(s) id 62b1b6d9b8fd5e697e145165
    //   Do a workout id 62b1c2033ee384607516f8f3
    //   Prepare your luggage id 62b1c268b8fd5e697e145178
    //   */
    // console.log(sortByFavorite);
    user && console.log(user.favoriteList);
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
    user && (
      <div className="taskWrapper">
        {console.log(user.todayCompleted)}
        {/* {console.log(user.todaySuccess)} */}
        {/* {console.log(user.todayFailed)} */}
        {tasksFiltered.map((task, index) => (
          <TaskMini key={index} task={task} user={user} />
        ))}
      </div>
    )
  );
}
