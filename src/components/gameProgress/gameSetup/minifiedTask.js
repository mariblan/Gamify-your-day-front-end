import checkCategory from "../../../utils/categoryCheck";
import notFavIcon from "../../../images/fav-icon.png";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import { loadFavorites, toggleFavorites } from "../../../utils/displayFavorite";
import { useState, useEffect, useRef } from "react";
import { selectTask, loadSelected } from "../../../utils/selectTask";
import { useTask } from "../../../taskContext";

export default function TaskMini({ task: { _id, taskName, category } }) {
  const { user, favoriteList, setFavoriteList, todaysList, setTodaysList } =
    useTask();
  const { icon, alt } = checkCategory(category);
  const [favorite, setFavorite] = useState(notFavIcon);
  const [taskClass, setTaskClass] = useState("taskMini");
  const [taskConcluded, setTaskConcluded] = useState(false);

  // These two useEffects check the favorite and selected arrays from the user and
  // render selecton and favorite icons adequately.
  useEffect(() => {
    favoriteList && setFavorite(loadFavorites(_id, [...favoriteList]));
  }, [_id, favoriteList]);

  useEffect(() => {
    todaysList && setTaskClass(loadSelected(_id, [...todaysList]));
  }, [_id, todaysList]);

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

  return (
    todaysList &&
    favoriteList && (
      <div
        className={taskClass}
        onClick={(e) =>
          selectTask(e, _id, user._id, todaysList).then((taskSelection) => {
            setTodaysList(taskSelection[0]);
            setTaskClass(taskSelection[1]);
          })
        }
      >
        {/* {console.log(minifiedTask.current)} */}
        {/* {console.log(user)} */}
        {/* {console.log(user.todayList)} */}
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
          onClick={() =>
            toggleFavorites(_id, user, favoriteList).then((data) => {
              setFavoriteList(data[0]);
              setFavorite(data[1]);
            })
          }
        />
      </div>
    )
  );
}
