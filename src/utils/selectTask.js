import { addToToday, removeFromToday } from "../fetchDB/fetchDB";

export const selectTask = async (e, taskId, userId, todaysList) => {
  if (e.target.name === "favIcon") return [];
  if (e.target.name !== "favIcon") {
    for (let task of todaysList) {
      // console.log(`This is the id of the iterated task:`);
      // console.log(task._id);
      // console.log(`This is the id of the selected task:`);
      // console.log(taskId);
      if (task._id === taskId) {
        console.log(`I exist in today's list! My ID is ${task._id}`);
        const newToday = await removeFromToday(userId, taskId).then(
          (updatedToday) => updatedToday
        );
        console.log(newToday);
        return [newToday, "taskMini"];
      }
    }
    // console.log(`I don't exist in today's list yet! My ID is ${task._id}`);
    const newToday = await addToToday(userId, taskId).then(
      (updatedToday) => updatedToday
    );
    console.log(newToday);
    return [newToday, "taskMiniSelected"];
  }
};

export const loadSelected = (taskId, userFavorites) => {
  for (let eachFavorite of userFavorites) {
    if (eachFavorite._id === taskId) return "taskMiniSelected";
  }
  return "taskMini";
};
