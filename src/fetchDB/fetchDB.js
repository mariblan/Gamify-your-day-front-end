import axios from "axios";

const port = process.env.PORT || "http://localhost:5000/";

const getAllTasks = async () => {
  const allTasks = await axios
    .get(port)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return allTasks;
};

const getUser = async (id) => {
  const oneUser = await axios
    .get(`${port}user/${id}`)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return oneUser;
};

const addToToday = async (id, taskId) => {
  const updatedFavorite = await axios
    .put(`${port}user/${id}/todayList/${taskId}`)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const removeFromToday = async (id, taskId) => {
  const updatedFavorite = await axios
    .put(`${port}user/${id}/todayList/${taskId}`)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const addFavorite = async (id, taskId) => {
  const updatedFavorite = await axios
    .put(`${port}user/${id}/favorites/${taskId}`)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const removeFavorite = async (id, taskId) => {
  const updatedFavorite = await axios
    .delete(`${port}user/${id}/favorites/${taskId}`)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

export {
  getAllTasks,
  getUser,
  addToToday,
  removeFromToday,
  addFavorite,
  removeFavorite,
};
