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
  // instead of get ('/user') path, in the future post an :id param and get the info for that user back
  const oneUser = await axios
    .get(`${port}user/${id}`)
    // .get(`/user/${id}`)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return oneUser;
};

export { getAllTasks, getUser };
