import checkCategory from "../../../utils/categoryCheck";
import notFavTask from "../../../images/fav-icon.png";
import favTask from "../../../images/fav-filled-icon.png";
import completedIcon from "../../../utils/markCompleted";
import { useState, useEffect, useRef } from "react";

export default function TaskMini({
  task,
  task: { _id },
  user: { favoriteTasks, todaySuccess, todayFailed },
  expandTask,
}) {
  //??? Same component is being called in different components, and not all of them pass
  // the same props. However, if a prop is undefined, the whole thing breaks. How to go around?
  const { icon, alt } = checkCategory(task.category);
  const minifiedTask = useRef();
  const [favorite, setFavorite] = useState(notFavTask);
  const [spreadFavTasks, setSpreadFavTasks] = useState([...favoriteTasks]);

  //!!! Since MyTaskList component will need this too, probably pass this into an util file
  const toggleFavorite = () => {
    // This function checks whether a task id is present in the user's favorite array. If not,
    // the task is added to the array and the icon changes to match. If it is, the id is removed
    // from the array and the icon changes accordingly.
    if (!spreadFavTasks.includes(_id)) {
      setSpreadFavTasks((prev) => [...prev, _id]);
    } else {
      setSpreadFavTasks((prev) => {
        //??? Here filtering prev didn't work, prev had to be spread in a new variable. Why?
        const previous = [...prev];
        return previous.filter((id) => _id !== id);
      });
    }
  };

  // Upon mount check if the user has any tasks marked as favorite, and update the icons accordingly
  //!!! If list is being sorted by favorite though, the favorite icons are selected by order of showing
  // and not relative to their taskId. Find a way around.
  useEffect(() => {
    // setFavorite(spreadFavTasks.includes(taskId) ? favTask : notFavTask);
  }, [spreadFavTasks]);

  // upon mount and when a task gets added to the success or failure arrays, the classname of the
  // parent container has to add "successTask" or "failedTask" so it can be sorted by classname.
  useEffect(() => {}, [todaySuccess, todayFailed]);

  return (
    <div
      className="taskMini"
      ref={minifiedTask}
      // onClick={() => expandTask("Sup")}
    >
      {/* {completedIcon(_id, todaySuccess, todayFailed)} */}
      <img src={icon} alt={alt} />
      <h3>{task.taskName}</h3>
      <img
        src={favorite}
        alt="A heart favorite icon"
        className="favIcon"
        onClick={toggleFavorite}
      />
    </div>
  );
}
