import TaskExpanded from "./expandedTask";
import TaskConcluded from "./taskConcluded";
// import { getCompletedIds } from "../../../fetchDB/fetchDB";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext";

export default function MyList({ showConcluded }) {
  const {
    user,
    nextClicked,
    todaysList,
    todaysCompleted,
    userSettings,
    setUserSettings,
  } = useTask();

  const [renderIncomplete, setRenderIncomplete] = useState(todaysList);
  const [renderComplete, setRenderComplete] = useState(todaysCompleted);

  const sendTaskSetting = async (taskSetting) => {
    if (nextClicked && userSettings.length === 0) {
      console.log(userSettings);
      await setUserSettings((prev) => [...prev, taskSetting]);
    }
  };

  useEffect(() => {
    if (showConcluded) {
      setRenderIncomplete(false);
      setRenderComplete(todaysCompleted);
    } else {
      setRenderIncomplete(todaysList);
      setRenderComplete(false);
    }
  }, [showConcluded]);

  // useEffect(() => {
  //   console.log(todaysSuccess);
  //   console.log(todaysFailed);
  //   if (!completedIds) {
  //     todaysSuccess.forEach((task) => {
  //       completedIds.includes(task._id)
  //         ? setCompletedIds([task._id])
  //         : setCompletedIds();
  //     });
  //     todaysFailed.forEach((task) => setCompletedIds([task._id]));
  //   } else {
  //     todaysSuccess.forEach((task) =>
  //       setCompletedIds((prev) => [...prev, task._id])
  //     );
  //     todaysFailed.forEach((task) =>
  //       setCompletedIds((prev) => [...prev, task._id])
  //     );
  //   }
  // setCompletedIds();
  // setRenderIncomplete((prev) => {
  //   console.log(prev);
  //   todaysList.forEach((task) => console.log(task._id));
  //   todaysList.forEach((task) => {
  //     console.log(todaysSuccess);
  //     console.log(todaysFailed);
  //     if (todaysSuccess.includes(task._id) || todaysFailed.includes(task._id))
  //       return console.log(task);
  //   });
  //   // todaysList.filter((task) => {
  //   //   if (todaysSuccess.includes(task._id) || todaysFailed.includes(task._id))
  //   //     return [...prev, task];
  //   // });
  //   return [...prev];
  // });
  // }, [todaysSuccess, todaysFailed]);

  //   if (filterSelection.length > 0) {
  //     const filterTasks = [...allTasks];
  //     const filteredTasks = filterTasks.filter((task) =>
  //       filterSelection.includes(task.category)
  //     );
  //     setTasksFiltered(filteredTasks);
  //   } else if (!sortByFavorite) {
  //     setTasksFiltered(allTasks);
  //   }
  // }, [allTasks, filterSelection]);

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
    <div className="taskWrapper">
      {/* {console.log(todaysCompleted)} */}
      {/* {console.log(completedIds)} */}
      {console.log("To do tasks:")}
      {console.log(renderIncomplete)}
      {console.log("Completed tasks:")}
      {console.log(renderComplete)}
      {renderIncomplete &&
        renderIncomplete.map((task, index) => (
          <TaskExpanded
            key={index}
            task={task}
            user={user}
            sendTaskSetting={sendTaskSetting}
          />
        ))}
      {renderComplete &&
        renderComplete.map((task, index) => (
          <TaskConcluded key={index} task={task} />
        ))}
    </div>
  );
}
