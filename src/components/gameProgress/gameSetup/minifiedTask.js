import checkCategory from "../../../utils/categoryCheck";
import notFavTask from "../../../images/fav-icon.png";
import favTask from "../../../images/fav-filled-icon.png";
import markCompleted from "../../../utils/markCompleted";
import { useState, useEffect, useRef } from "react";

export default function TaskMini({
  task: { taskId, taskName, category },
  user: { favoriteTasks, todaySuccess, todayFailed },
}) {
  const { icon, alt } = checkCategory(category);
  const minifiedTask = useRef();
  const [favorite, setFavorite] = useState(notFavTask);
  const [spreadFavTasks, setSpreadFavTasks] = useState([...favoriteTasks]);

  //!!! Since MyTaskList component will need this too, probably pass this into an util file
  const toggleFavorite = () => {
    // This function checks whether a task id is present in the user's favorite array. If not,
    // the task is added to the array and the icon changes to match. If it is, the id is removed
    // from the array and the icon changes accordingly.
    if (!spreadFavTasks.includes(taskId)) {
      setSpreadFavTasks((prev) => [...prev, taskId]);
    } else {
      setSpreadFavTasks((prev) => {
        //??? Here filtering prev didn't work, prev had to be spread in a new variable. Why?
        const previous = [...prev];
        return previous.filter((id) => taskId !== id);
      });
    }
  };

  // Upon mount check if the user has any tasks marked as favorite, and update the icons accordingly
  useEffect(() => {
    setFavorite(spreadFavTasks.includes(taskId) ? favTask : notFavTask);
  }, [spreadFavTasks]);

  // Sorting: by favorites or by completion...?
  // upon mount and when a task gets added to the success or failure arrays, the classname of the
  // parent container has to add "successTask" or "failedTask" so it can be sorted by classname.
  useEffect(() => {}, [todaySuccess, todayFailed]);

  return (
    <div className="taskMini" ref={minifiedTask}>
      {markCompleted(taskId, todaySuccess, todayFailed)}
      <img src={icon} alt={alt} />
      <h3>{taskName}</h3>
      <img
        src={favorite}
        alt="A heart favorite icon"
        className="favIcon"
        onClick={toggleFavorite}
      />
    </div>
  );
}
