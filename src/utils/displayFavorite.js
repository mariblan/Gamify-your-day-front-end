import notFavIcon from '../images/fav-icon.png';
import favIcon from '../images/fav-filled-icon.png';
import { addFavorite, removeFavorite } from '../fetchDB/fetchDB';

export const toggleFavorites = async (taskId, user, favoriteList) => {
  for (let i = 0; i < favoriteList.length; i++) {
    if (favoriteList[i]._id === taskId) {
      const newFavs = await removeFavorite(user._id, taskId).then(
        (newFavorites) => newFavorites
      );
      return [newFavs, favIcon];
    }
  }
  const newFavs = await addFavorite(user._id, taskId).then(
    (newFavorites) => newFavorites
  );
  return [newFavs, notFavIcon];
};

export const loadFavorites = (taskId, todaysList) => {
  for (let eachTask of todaysList) {
    if (eachTask._id === taskId) return favIcon;
  }
  return notFavIcon;
};
