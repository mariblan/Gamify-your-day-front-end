import TaskExpanded from "./expandedTask";
import { getCompletedIds } from "../../../fetchDB/fetchDB";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext";

export default function MyList() {
  const {
    user,
    nextClicked,
    todaysList,
    todaysSuccess,
    todaysFailed,
    userSettings,
    setUserSettings,
  } = useTask();

  const [renderIncomplete, setRenderIncomplete] = useState(todaysList);
  const [completedIds, setCompletedIds] = useState(false);

  const sendTaskSetting = (taskSetting) => {
    if (nextClicked && userSettings.length === 0) {
      setUserSettings((prev) => [...prev, taskSetting]);
    }
  };

  useEffect(() => {
    getCompletedIds(user._id);
  }, []);

  useEffect(() => {
    setCompletedIds();
    setRenderIncomplete((prev) => {
      console.log(prev);
      todaysList.forEach((task) => console.log(task._id));
      todaysList.forEach((task) => {
        console.log(todaysSuccess);
        console.log(todaysFailed);
        if (todaysSuccess.includes(task._id) || todaysFailed.includes(task._id))
          return console.log(task);
      });
      // todaysList.filter((task) => {
      //   if (todaysSuccess.includes(task._id) || todaysFailed.includes(task._id))
      //     return [...prev, task];
      // });
      return [...prev];
    });
  }, [todaysSuccess, todaysFailed]);

  // useEffect(() => {
  //   for (let success of todaysSuccess) {
  //     setCompletedIds((prev) => [...prev, success._id]);
  //     // if (success._id === _id) return setTaskConcluded("success");
  //     // if (success._id === _id) return blockCompleted(_id);
  //   }

  //   for (let failure of todaysFailed) {
  //     setCompletedIds((prev) => [...prev, failure._id]);
  //     // if (failure._id === _id) return setTaskConcluded("failed");
  //     // if (failure._id === _id) return blockCompleted(_id);
  //   }
  //   setRenderIncomplete(
  //     todaysList.filter((task) => task._id !== renderIncomplete)
  //   );
  // }, [todaysSuccess, todaysFailed]);

  // const blockCompleted = (completedId) => {
  //   if (completedId) todaysList.filter((task) => task._id !== completedId);
  // };

  // User is not coming back but todaysList is. Why?

  return (
    renderIncomplete && (
      <div className="taskWrapper">
        {/* {console.log(todaysCompleted)} */}
        {console.log(completedIds)}
        {renderIncomplete.map((task, index) => (
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
