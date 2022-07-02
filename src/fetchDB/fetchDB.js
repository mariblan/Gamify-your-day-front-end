import axios from "axios";

const port =
  process.env.REACT_APP_GAMIFY_BACKEND_URL || "http://localhost:5000/";

const getAllTasks = async () => {
  const allTasks = await axios
    .get(port)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return allTasks;
};

const checkValidToken = async (token) => {
  const login = axios
    .post(`${port}auth/me`, {}, { headers: { Authorization: token } })
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return login;
};

const loginUser = async (userSignIn) => {
  const login = axios
    .post(`${port}auth/login`, { ...userSignIn })
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return login;
};

const registerUser = async (userRegister) => {
  const register = axios
    .post(`${port}auth/register`, { ...userRegister })
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return register;
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
    .delete(`${port}user/${id}/todayList/${taskId}`)
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

const addFailed = async (id, taskObj) => {
  const updatedFailed = await axios
    .put(`${port}user/${id}/failed/${taskObj._id}`, { ...taskObj })
    .then(({ data }) => data.todayFailed)
    .catch((err) => console.error(`Error: ${err}`));
  return updatedFailed;
};

const addSuccess = async (id, taskObj) => {
  const updatedSuccess = await axios
    .put(`${port}user/${id}/success/${taskObj._id}`, { ...taskObj })
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
  checkValidToken,
  loginUser,
  registerUser,
  addToToday,
  removeFromToday,
  addFavorite,
  removeFavorite,
  addFailed,
  addSuccess,
  addToProgress,
};
