import notFavIcon from "../images/fav-icon.png";
import favIcon from "../images/fav-filled-icon.png";

const displayFavorite = (taskId, userFavorites) => {
  for (let favorite of userFavorites) {
    if (favorite._id === taskId) favIcon;
  }
};

export default displayFavorite;
