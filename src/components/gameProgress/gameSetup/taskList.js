import TaskMini from './minifiedTask';
import { useState, useEffect } from 'react';
import { useTask } from '../../../taskContext.js';

export default function TaskList({
  filterSelection,
  // searchValue,
  sortByFavorite,
}) {
  const [tasksFiltered, setTasksFiltered] = useState([]);
  const { user, allTasks, favoriteList } = useTask();

  useEffect(() => {
    // setTasksFiltered(allData);
    //!!! If time allows, order the task categories by the reverse order in which they were
    // inputted in the array (last category selection shows first in list)
    // setTasksFiltered(allData.sort((a,b) => {
    //   const filterSelectionOrder = filterSelection
    // }));
    // });
  }, []);

  // Sorts all tasks by favorite (based on user settings)
  useEffect(() => {
    if (!sortByFavorite) setTasksFiltered(allTasks);
    if (sortByFavorite) {
      const favoriteIds = favoriteList.map((favTask) => {
        return favTask._id;
      });
      const sortFavs = [...allTasks].sort((a, b) => {
        return favoriteIds.includes(a._id) ? -1 : 1;
      });
      setTasksFiltered(sortFavs);
    }
  }, [sortByFavorite]);

  // This useEffect checks the filter array and filters the displayed tasks to show only the tasks
  // whose category match the category selected in the filter (in parent component)
  useEffect(() => {
    window.scrollTo(0, 0);
    // ??? When filterSelection is an empty array, it (correctly) considers filterSelection.length = 0
    // ??? and yet filterSelection === [] is false. Wth, why???
    // console.log(filterSelection);
    // filterSelection === [] ? console.log(true) : console.log(false);
    if (filterSelection.length > 0) {
      const filterTasks = [...allTasks];
      const filteredTasks = filterTasks.filter((task) =>
        filterSelection.includes(task.category)
      );
      setTasksFiltered(filteredTasks);
    } else if (!sortByFavorite) {
      setTasksFiltered(allTasks);
    }
  }, [allTasks, filterSelection]);

  // Sorts all tasks by completion (based on user's daily progress)
  // useEffect(() => {
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
    allTasks &&
    tasksFiltered && (
      <div className='taskWrapper'>
        {tasksFiltered.map((task, index) => (
          <TaskMini key={index} task={task} user={user} />
        ))}
      </div>
    )
    // )
  );
}
