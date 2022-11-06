import { notFavIcon, favIcon } from "../images";
import { addFavorite, removeFavorite } from "../fetchDB/fetchDB";

export const toggleFavorites = async (taskId, user, favoriteList) => {
  console.log(taskId);
  console.log(user);
  console.log(favoriteList);
  for (let i = 0; i < favoriteList.length; i++) {
    if (favoriteList[i]._id === taskId) {
      // console.log(`I match! My Id is: ${taskId}`);
      const newFavs = await removeFavorite(user._id, taskId).then(
        (newFavorites) => newFavorites
      );
      return [newFavs, favIcon];
    }
  }
  // console.log(`I don't match! My Id is ${taskId}`);
  const newFavs = await addFavorite(user._id, taskId).then(
    (newFavorites) => newFavorites
  );
  console.log(newFavs);
  return [newFavs, notFavIcon];
};

export const loadFavorites = (taskId, todaysList) => {
  for (let eachTask of todaysList) {
    if (eachTask._id === taskId) return favIcon;
  }
  return notFavIcon;
};
