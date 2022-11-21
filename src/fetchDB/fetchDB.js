import axios from 'axios';

const port =
  process.env.REACT_APP_GAMIFY_BACKEND_URL || 'http://localhost:5000/';
// 'http://localhost:5000/';

const getAllTasks = async () => {
  try {
    const { data } = await axios(port);
    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

const checkValidToken = async (token) => {
  try {
    const { data } = await axios.post(
      `${port}auth/me`,
      {},
      { headers: { Authorization: token } }
    );
    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

const loginUser = async (userSignIn) => {
  try {
    const { data } = await axios.post(`${port}auth/login`, { ...userSignIn });
    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

const registerUser = async (userRegister) => {
  try {
    const { data } = await axios.post(`${port}auth/register`, {
      ...userRegister,
    });
    return data;
  } catch (error) {
    return error.response.data.error;
  }
};

const addToToday = async (id, taskId) => {
  try {
    const { data } = await axios.put(`${port}user/${id}/todayList/${taskId}`);
    return data.todayList;
  } catch (error) {
    return error.response.data.error;
  }
};

const removeFromToday = async (id, taskId) => {
  try {
    const { data } = await axios.delete(
      `${port}user/${id}/todayList/${taskId}`
    );
    return data.todayList;
  } catch (error) {
    return error.response.data.error;
  }
};

const clearToday = async (id) => {
  try {
    const { data } = await axios.delete(`${port}user/${id}/todayList`);
    return data.todayList;
  } catch (error) {
    return error.response.data.error;
  }
};

const addFavorite = async (id, taskId) => {
  try {
    const { data } = await axios.put(`${port}user/${id}/favorites/${taskId}`);
    return data.favoriteList;
  } catch (error) {
    return error.response.data.error;
  }
};

const removeFavorite = async (id, taskId) => {
  try {
    const { data } = await axios.delete(
      `${port}user/${id}/favorites/${taskId}`
    );
    return data.favoriteList;
  } catch (error) {
    return error.response.data.error;
  }
};

const addFailed = async (id, taskObj) => {
  try {
    const { data } = await axios.put(
      `${port}user/${id}/failed/${taskObj._id}`,
      {
        ...taskObj,
      }
    );
    return data.todayFailed;
  } catch (error) {
    return error.response.data.error;
  }
};

const clearFailed = async (id) => {
  try {
    const { data } = await axios.delete(`${port}user/${id}/failed`);
    return data.todayFailed;
  } catch (error) {
    return error.response.data.error;
  }
};

const getCompleted = async (id) => {
  try {
    const { data } = await axios(`${port}user/${id}/completed`);
    return data.todayFailed;
  } catch (error) {
    return error.response.data.error;
  }
};

const clearCompleted = async (id) => {
  try {
    const { data } = await axios.delete(`${port}user/${id}/completed`);
    return data.todayCompleted;
  } catch (error) {
    return error.response.data.error;
  }
};

const addSuccess = async (id, taskObj) => {
  try {
    const { data } = await axios.put(
      `${port}user/${id}/success/${taskObj._id}`,
      { ...taskObj }
    );
    return data.todaySuccess;
  } catch (error) {
    return error.response.data.error;
  }
};

const clearSuccess = async (id) => {
  try {
    const { data } = await axios.delete(`${port}user/${id}/success`);
    return data.todaySuccess;
  } catch (error) {
    return error.response.data.error;
  }
};

const addToProgress = async (id, newUserProgress) => {
  try {
    const { data } = await axios.put(`${port}user/${id}/${newUserProgress}`);
    return data.progress;
  } catch (error) {
    return error.response.data.error;
  }
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
