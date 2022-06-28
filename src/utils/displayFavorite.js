import notFavIcon from "../images/fav-icon.png";
import favIcon from "../images/fav-filled-icon.png";
import { addFavorite, removeFavorite } from "../fetchDB/fetchDB";

export const toggleFavorites = async (taskId, user, favoriteList) => {
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
  return [newFavs, notFavIcon];
};

export const loadFavorites = (taskId, userFavorites) => {
  for (let eachFavorite of userFavorites) {
    if (eachFavorite._id === taskId) return favIcon;
  }
  return notFavIcon;
};
