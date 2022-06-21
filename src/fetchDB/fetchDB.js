import axios from "axios";

const port = process.env.PORT || "http://localhost:5000/";

const getTasks = async () => {
  const allTasks = await axios
    .get(port)
    .then(({ data }) => data)
    .catch((err) => console.error(`Error: ${err}`));
  return allTasks;
};

export default getTasks;
