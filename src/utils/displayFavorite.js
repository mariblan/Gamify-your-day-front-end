import notFavIcon from "../images/fav-icon.png";
import favIcon from "../images/fav-filled-icon.png";
import { getUser, addFavorite, removeFavorite } from "../fetchDB/fetchDB";

const loadFavorites = (taskId, userFavorites) => {
  for (let i = 0; i < userFavorites.length; i++) {
    if (userFavorites[i]._id === taskId) return favIcon;
  }
  return notFavIcon;
};

const toggleFavorites = async (taskId, userFavorites) => {
  console.log(`I've been clicked!`);
  // const checkFavorites = getUser(user._id).then((userData) => userData);
  // checkFavorites && console.log(checkFavorites);
  for (let i = 0; i < userFavorites.length; i++) {
    if (userFavorites[i]._id === taskId) {
      console.log(`I match! My Id is: ${taskId}`);
      let { favoriteList } = await removeFavorite(
        "62b1b57082c8ed601e7094fc",
        taskId
      );
      console.log(favoriteList);

      return favIcon;
    }

    // for (let favorite of userFavorites) {
    //   console.log(favorite);
    //   if (favorite._id === taskId) {
    //     console.log(`I match! My Id is: ${taskId}`);
    //     removeFavorite("62b1b57082c8ed601e7094fc", taskId);
    //     console.log(userFavorites);
    //     return favIcon;
    //   }
  }
  console.log(`I don't match! My Id is ${taskId}`);
  let { favoriteList } = await addFavorite("62b1b57082c8ed601e7094fc", taskId);
  console.log(favoriteList);
  return notFavIcon;
};

export { toggleFavorites, loadFavorites };
