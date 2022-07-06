import { addToToday, removeFromToday } from "../fetchDB/fetchDB";

// maybe instead of on click on the heart just run select task for all the div.

export const selectTask = async (e, taskId, user, todaysList) => {
  // console.log(taskId)
  // console.log(user)
  // console.log(todaysList)
  if (e.target.name === "favIcon") {
    // toggleFavorites(taskId, user, user.favoriteList);
    return;
  }
  if (e.target.name !== "favIcon") {
    for (let task of todaysList) {
      if (task._id === taskId) {
        console.log(`I exist in today's list! My ID is ${task._id}`);
        const newToday = await removeFromToday(user._id, taskId).then(
          (updatedToday) => updatedToday
        );
        // console.log(newToday);
        return [newToday, "taskMini"];
      }
    }
    // console.log(`I don't exist in today's list yet! My ID is ${task._id}`);
    const newToday = await addToToday(user._id, taskId).then(
      (updatedToday) => updatedToday
    );
    // console.log(newToday);
    return [newToday, "taskMiniSelected"];
  }
};

export const loadSelected = (taskId, todaysList, todaysCompleted) => {
  for (let eachDaily of todaysList) {
    if (eachDaily._id === taskId) return "taskMiniSelected";
  }
  for (let eachCompletion of todaysCompleted) {
    if (eachCompletion._id === taskId) return "taskMiniSelected";
  }
  return "taskMini";
};
