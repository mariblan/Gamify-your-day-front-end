import checkCategory from "../../../utils/categoryCheck";
import notFavIcon from "../../../images/fav-icon.png";
import { loadFavorites, toggleFavorites } from "../../../utils/displayFavorite";
import completedIcon from "../../../utils/markCompleted";
import { useState, useEffect, useRef } from "react";
import { addFavorite, removeFavorite } from "../../../fetchDB/fetchDB";

export default function TaskMini({
  task: { _id, taskName, category },
  user,
  user: { favoriteList, todaySuccess, todayFailed },
}) {
  //??? Same component is being called in different components, and not all of them pass
  // the same props. However, if a prop is undefined, the whole thing breaks. How to go around?
  const { icon, alt } = checkCategory(category);
  const minifiedTask = useRef();
  const [favorite, setFavorite] = useState(notFavIcon);
  const [spreadFavTasks, setSpreadFavTasks] = useState([...favoriteList]);
  const [changeUserFavs, setChangeUserFavs] = useState(false);

  //!!! Since MyTaskList component will need this too, probably pass this into an util file
  // This onClick function will check whether the icon is the filled or empty heart.
  // It will change to the other icon on click, and make changeUserFavs state
  // to true or false, which will trigger db querying to update user infos
  // in the db
  // const toggleFavorite = () => {
  // This function checks whether a task id is present in the user's favorite array. If not,
  // the task is added to the array and the icon changes to match. If it is, the id is removed
  // from the array and the icon changes accordingly.
  // console.log(taskName, _id);
  // favorite === favIcon ? setChangeUserFavs(false) : setChangeUserFavs(true);
  // setFavorite((prev) => (prev === favIcon ? notFavIcon : favIcon));
  // };

  // This useEffect checks the user's favorite tasks and see if it matches
  // with the id of this task. If it does, the correct icon renders
  useEffect(() => {
    setFavorite(loadFavorites(_id, spreadFavTasks));
  }, []);

  //??? This useEffect is meant to add or remove objectIds from the user's
  // favorite tasks in the db. However it also runs upon mount, meaning it
  // would remove all tasks in the db. How to get around it?
  // useEffect(() => {
  //   if (changeUserFavs) addFavorite("62b1b57082c8ed601e7094fc", _id);
  //   // setFavorite(spreadFavTasks.includes(taskId) ? favIcon : notFavIcon);
  // }, [changeUserFavs]);

  // upon mount and when a task gets added to the success or failure arrays, the classname of the
  // parent container has to add "successTask" or "failedTask" so it can be sorted by classname.
  // useEffect(() => {}, [todaySuccess, todayFailed]);

  return (
    <div className="taskMini" ref={minifiedTask}>
      {console.log(spreadFavTasks)}
      {/* {console.log(_id)} */}
      {/* {favoriteList.forEach((ea) => console.log(ea._id, ea.taskName))} */}
      {/* {completedIcon(_id, todaySuccess, todayFailed)} */}
      <img src={icon} alt={alt} />
      <h3>{taskName}</h3>
      <img
        src={favorite}
        alt="A heart favorite icon"
        className="favIcon"
        onClick={() => toggleFavorites(_id, [...favoriteList])}
      />
    </div>
  );
}
