import checkCategory from "../../../utils/categoryCheck";
import notFavIcon from "../../../images/fav-icon.png";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import {
  loadFavorites /*toggleFavorites*/,
} from "../../../utils/displayFavorite";
import { useState, useEffect, useRef } from "react";
import selectTask from "../../../utils/selectTask";
import {
  addToToday,
  removeFromToday,
  addFavorite,
  removeFavorite,
} from "../../../fetchDB/fetchDB";
import { useTask } from "../../../taskContext";

export default function TaskMini({
  task,
  task: { _id, taskName, category },
  // user: { favoriteList, todayList, todaySuccess, todayFailed },
}) {
  //??? Same component is being called in different components, and not all of them pass
  // the same props. However, if a prop is undefined, the whole thing breaks. How to go around?
  const { user } = useTask();
  const { icon, alt } = checkCategory(category);
  const minifiedTask = useRef();
  const [favorite, setFavorite] = useState(notFavIcon);
  const [spreadFavTasks, setSpreadFavTasks] = useState([...user.favoriteList]);
  const [changeUserFavs, setChangeUserFavs] = useState(false);
  const [taskConcluded, setTaskConcluded] = useState(false);

  // const toggleFavorite = () => {
  // This function checks whether a task id is present in the user's favorite array. If not,
  // the task is added to the array and the icon changes to match. If it is, the id is removed
  // from the array and the icon changes accordingly.
  // console.log(taskName, _id);
  // favorite === favIcon ? setChangeUserFavs(false) : setChangeUserFavs(true);
  // setFavorite((prev) => (prev === favIcon ? notFavIcon : favIcon));
  // };

  useEffect(() => {
    setSpreadFavTasks([...user.favoriteList]);
  }, [user.favoriteList]);

  // Checks whether the task is present in the today's selection list. If it is, it loads with the
  // correct class
  useEffect(() => {
    user.todayList.forEach((task) => {
      if (task._id === _id) {
        minifiedTask.current.className = "taskMiniSelected";
      }
    });
  }, [minifiedTask]);

  // Checks the success and failure arrays from the user and sets the trigger to render the check marks
  useEffect(() => {
    for (let success of user.todaySuccess) {
      // console.log(success);
      if (success._id === _id) setTaskConcluded("success");
    }

    for (let failure of user.todayFailed) {
      // console.log(failure);
      if (failure._id === _id) setTaskConcluded("failed");
    }
  }, [user.todaySuccess, user.todayFailed]);

  // Checks the state of the task and if it was succeeded or failed, it renders the adequate mark
  const checkCompletion = () => {
    if (taskConcluded === "failed") {
      return <img src={redX} alt="An x icon" className="taskConcluded" />;
    }
    if (taskConcluded === "success") {
      return (
        <img
          src={greenCheck}
          alt="A green check icon"
          className="taskConcluded"
        />
      );
    }
  };

  useEffect(() => {
    setFavorite(loadFavorites(_id, spreadFavTasks));
  }, [spreadFavTasks]);

  return (
    <div
      className="taskMini"
      ref={minifiedTask}
      onClick={(e) => selectTask(e, user.todayList)}
    >
      {/* {console.log(user)} */}
      {/* {console.log(todayList)} */}
      {/* {console.log("These are the favorites:")} */}
      {/* {console.log(user.favoriteList)} */}
      {checkCompletion()}
      <img src={icon} alt={alt} />
      <h3>{taskName}</h3>
      <img
        name="favIcon"
        src={favorite}
        alt="A heart favorite icon"
        className="favIcon"
        // onClick={() => toggleFavorites(_id, [...user.favoriteList])}
      />
    </div>
  );
}
