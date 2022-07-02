import TaskExpanded from "./expandedTask";
import { getUser } from "../../../fetchDB/fetchDB";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext";

export default function MyList() {
  // console.log(searchValue);
  //!!! displayedTasks needs to have only the tasks inside the user's daily list (if any)
  const [displayedTasks, setDisplayedTasks] = useState(false);
  const {
    user,
    setUser,
    nextClicked,
    setNextClicked,
    todaysList,
    setTodaysList,
    userSettings,
    setUserSettings,
  } = useTask();

  const sendTaskSetting = (taskSetting) => {
    if (nextClicked && userSettings.length === 0) {
      setUserSettings((prev) => [...prev, taskSetting]);
    }
  };

  // User is not coming back but todaysList is. Why?

  return (
    todaysList && (
      <div className="taskWrapper">
        {/* {console.log(todaysCompleted)} */}
        {todaysList.map((task, index) => (
          // if (!todaysCompleted)
          <TaskExpanded
            key={index}
            task={task}
            user={user}
            sendTaskSetting={sendTaskSetting}
          />
        ))}
      </div>
    )
  );
}
