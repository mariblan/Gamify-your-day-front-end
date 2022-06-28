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
    .then(({ data }) => data.todayList)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const removeFromToday = async (id, taskId) => {
  const updatedFavorite = await axios
    .put(`${port}user/${id}/todayList/${taskId}`)
    .then(({ data }) => data.todayList)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const addFavorite = async (id, taskId) => {
  const updatedFavorite = await axios
    .put(`${port}user/${id}/favorites/${taskId}`)
    .then(({ data }) => data.favoriteList)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const removeFavorite = async (id, taskId) => {
  const updatedFavorite = await axios
    .delete(`${port}user/${id}/favorites/${taskId}`)
    .then(({ data }) => data.favoriteList)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFavorite;
};

const addCompleted = async (id, taskId) => {
  const updatedCompleted = await axios
    .put(`${port}user/${id}/completed/${taskId}`)
    .then(({ data }) => data.todayCompleted)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedCompleted;
};

const addFailed = async (id, taskId) => {
  const updatedFailed = await axios
    .put(`${port}user/${id}/failed/${taskId}`)
    .then(({ data }) => data.todayFailed)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFailed;
};

const addSuccess = async (id, taskId) => {
  const updatedSuccess = await axios
    .put(`${port}user/${id}/success/${taskId}`)
    .then(({ data }) => data.todaySuccess)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedSuccess;
};

const addToProgress = async (id, newUserProgress) => {
  const updatedProgress = await axios
    .put(`${port}user/${id}/${newUserProgress}`)
    .then(({ data }) => data.progress)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedProgress;
};

export {
  getAllTasks,
  getUser,
  addToToday,
  removeFromToday,
  addFavorite,
  removeFavorite,
  addCompleted,
  addFailed,
  addSuccess,
  addToProgress,
};
