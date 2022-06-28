import TaskExpanded from "./expandedTask";
import { getUser } from "../../../fetchDB/fetchDB";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext";

export default function MyList({ next }) {
  // filter category will take the tasbDB mock and the filter name (if any) and return only objects
  // that match the filtering
  // console.log(searchValue);
  //!!! displayedTasks needs to have only the tasks inside the user's daily list (if any)
  // const [user, setUser] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState(false);
  const {
    user,
    setUser,
    todaysList,
    setTodaysList,
    userSettings,
    setUserSettings,
  } = useTask();

  // useEffect(() => {
  //   getUser("62b1b57082c8ed601e7094fc").then((user) => setUser(user));
  // }, []);

  const sendTaskSetting = (taskSetting) => {
    if (next) {
      setUserSettings((prev) => [...prev, taskSetting]);
    }
  };

  // User is not coming back but todaysList is. Why?

  return (
    todaysList && (
      <div className="taskWrapper">
        {console.log(userSettings)}
        {todaysList.map((task, index) => (
          <TaskExpanded
            key={index}
            task={task}
            user={user}
            sendTaskSetting={sendTaskSetting}
            nextClicked={next}
          />
        ))}
      </div>
    )
  );
}
