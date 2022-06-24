// This function changes class name of the mini div if in the
// full task list screen, or unmounts the div and mounts an expanded div in it's place
const selectTask = (e, userDailyList) => {
  console.log(userDailyList);
  if (e.target.nodeName === "DIV") {
    // console.log(userDailyList);
    return e.target.className === "taskMini"
      ? (e.target.className = "taskMiniSelected")
      : (e.target.className = "taskMini");
  } else if (e.target.nodeName !== "DIV" && e.target.name !== "favIcon") {
    // console.log(userDailyList);
    return e.target.parentNode.className === "taskMini"
      ? (e.target.parentNode.className = "taskMiniSelected")
      : (e.target.parentNode.className = "taskMini");
  }

  // Upon click, the task object needs to be pushed to the db
  if (userDailyList) {
    console.log(userDailyList);
  }
};

export default selectTask;
