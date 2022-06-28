import { addToToday, removeFromToday } from "../fetchDB/fetchDB";

// This function changes class name of the mini div if in the
// full task list screen, or unmounts the div and mounts an expanded div in it's place
const selectTask = async (e, taskId, userDailyList) => {
  // console.log(userDailyList);
  if (e.target.name !== "favIcon") {
    e.currentTarget.className === "taskMini"
      ? (e.currentTarget.className = "taskMiniSelected")
      : (e.currentTarget.className = "taskMini");
  }

  for (let task of userDailyList) {
    if (task._id === taskId) {
      return await removeFromToday();
    }
    return addToToday();
  }

  // Upon click, the task object needs to be pushed to the db
  // if (userDailyList) {
  //   console.log(userDailyList);
  // }
};

export default selectTask;
