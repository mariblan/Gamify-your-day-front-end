import notFavIcon from "../images/fav-icon.png";
import favIcon from "../images/fav-filled-icon.png";
import { getUser, addFavorite, removeFavorite } from "../fetchDB/fetchDB";
import { useTask } from "../taskContext";

export default function SetFavorite({
  taskId,
  userFavorites,
  setContext,
  setIcon,
}) {
  const {
    user: { _id },
  } = useTask();

  console.log(taskId);
  console.log(userFavorites);
  console.log(setContext);
  console.log(setIcon);

  // const checkFavorites = getUser(user._id).then((userData) => userData);
  // checkFavorites && console.log(checkFavorites);
  for (let i = 0; i < userFavorites.length; i++) {
    if (userFavorites[i]._id === taskId) {
      console.log(`I match! My Id is: ${taskId}`);
      removeFavorite(_id, taskId, setContext);
      // console.log("These are the favorites:");
      // console.log(userFavorites);
      return setIcon(favIcon);
    }
  }
  console.log(`I don't match! My Id is ${taskId}`);
  addFavorite(_id, taskId, setContext);
  // console.log("These are the favorites:");
  // console.log(userFavorites);
  return setIcon(notFavIcon);
}

export const toggleFavorites = async (taskId, user, favoriteList) => {
  for (let i = 0; i < favoriteList.length; i++) {
    if (favoriteList[i]._id === taskId) {
      console.log(`I match! My Id is: ${taskId}`);
      const newFavs = await removeFavorite(user._id, taskId).then(
        (newFavorites) => newFavorites
      );
      return [newFavs, favIcon];
    }
  }
  console.log(`I don't match! My Id is ${taskId}`);
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

/*

The issue:
  DB is being altered nearly adequately. Upon click the item gets added or removed from the DB
  (with some console.logs to check if things are happening in the correct steps). However!
  1. Even when getting the correct updated data back, I can't save it in context (tried to get
  the state setter as an argument and place it inside the .then of the axios promise function,
  but that doesn't set the context). I can't have state happening in a function like this?
  How to go around it then?
  2. Even though the correct data is being given back, it's not recognized until refresh (its a react
  app so refreshes shouldn't be happening). What can I do?

*/
