import axios from "axios";

const port =
  // process.env.REACT_APP_GAMIFY_BACKEND_URL || "http://localhost:5000/";
  "http://localhost:5000/";

const getAllTasks = async () => {
  const allTasks = await axios
    .get(port)
    .then(({ data }) => data)
    .catch((error) => error.response.data);
  return allTasks;
};

const checkValidToken = async (token) => {
  const login = axios
    .post(`${port}auth/me`, {}, { headers: { Authorization: token } })
    .then(({ data }) => data)
    .catch((error) => error.response.data);
  return login;
};

const loginUser = async (userSignIn) => {
  const login = axios
    .post(`${port}auth/login`, { ...userSignIn })
    .then(({ data }) => data)
    .catch((error) => error.response.data);
  return login;
};

const registerUser = async (userRegister) => {
  const register = axios
    .post(`${port}auth/register`, { ...userRegister })
    .then(({ data }) => data)
    .catch((error) => error.response.data);
  return register;
};

const addToToday = async (id, taskId) => {
  const updatedToday = await axios
    .put(`${port}user/${id}/todayList/${taskId}`)
    .then(({ data }) => data.todayList)
    .catch((error) => error.response.data);
  return updatedToday;
};

const removeFromToday = async (id, taskId) => {
  const updatedToday = await axios
    .delete(`${port}user/${id}/todayList/${taskId}`)
    .then(({ data }) => data.todayList)
    .catch((error) => error.response.data);
  return updatedToday;
};

const clearToday = async (id) => {
  const updatedToday = await axios
    .delete(`${port}user/${id}/todayList`)
    .then(({ data }) => data.todayList)
    .catch((error) => error.response.data);
  return updatedToday;
};

const addFavorite = async (id, taskId) => {
  const updatedFavorite = await axios
    .put(`${port}user/${id}/favorites/${taskId}`)
    .then(({ data }) => data.favoriteList)
    .catch((error) => error.response.data);
  return updatedFavorite;
};

const removeFavorite = async (id, taskId) => {
  const updatedFavorite = await axios
    .delete(`${port}user/${id}/favorites/${taskId}`)
    .then(({ data }) => data.favoriteList)
    .catch((error) => error.response.data);
  return updatedFavorite;
};

const addFailed = async (id, taskObj) => {
  const updatedFailed = await axios
    .put(`${port}user/${id}/failed/${taskObj._id}`, { ...taskObj })
    .then(({ data }) => data.todayFailed)
    .catch((error) => error.response.data);
  return updatedFailed;
};

const clearFailed = async (id) => {
  const updatedFailed = await axios
    .delete(`${port}user/${id}/failed`)
    .then(({ data }) => data.todayFailed)
    .catch((error) => error.response.data);
  return updatedFailed;
};

const getCompleted = async (id) => {
  const completedIds = await axios
    .get(`${port}user/${id}/completed`)
    .then(({ data }) => data.todayFailed)
    .catch((error) => error.response.data);
  return completedIds;
};

const clearCompleted = async (id) => {
  const completedIds = await axios
    .delete(`${port}user/${id}/completed`)
    .then(({ data }) => data.todayCompleted)
    .catch((error) => error.response.data);
  return completedIds;
};

const addSuccess = async (id, taskObj) => {
  const updatedSuccess = await axios
    .put(`${port}user/${id}/success/${taskObj._id}`, { ...taskObj })
    .then(({ data }) => data.todaySuccess)
    .catch((error) => error.response.data);
  return updatedSuccess;
};

const clearSuccess = async (id) => {
  const updatedSuccess = await axios
    .delete(`${port}user/${id}/success`)
    .then(({ data }) => data.todaySuccess)
    .catch((error) => error.response.data);
  return updatedSuccess;
};

const addToProgress = async (id, newUserProgress) => {
  const updatedProgress = await axios
    .put(`${port}user/${id}/${newUserProgress}`)
    .then(({ data }) => data.progress)
    .catch((error) => error.response.data);
  return updatedProgress;
};

export {
  getAllTasks,
  checkValidToken,
  loginUser,
  registerUser,
  addToToday,
  removeFromToday,
  clearToday,
  addFavorite,
  removeFavorite,
  addFailed,
  getCompleted,
  clearCompleted,
  clearFailed,
  addSuccess,
  clearSuccess,
  addToProgress,
};
