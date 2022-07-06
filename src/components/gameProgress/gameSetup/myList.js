import TaskExpanded from "./expandedTask";
import TaskConcluded from "./taskConcluded";
import { useState, useEffect } from "react";
import { useTask } from "../../../taskContext";

export default function MyList({ showConcluded }) {
  const {
    user,
    nextClicked,
    todaysList,
    todaysCompleted,
    todaysSuccess,
    userSettings,
    setUserSettings,
    setDisabled,
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
    window.scrollTo(0, 0);
    if (showConcluded) {
      setRenderIncomplete(false);
      setRenderComplete(todaysCompleted);
    } else {
      setRenderIncomplete(todaysList);
      setRenderComplete(false);
    }
  }, [showConcluded]);

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

  return (
    // console.log(userSettings) || (
    <div className="taskWrapper">
      {/* {console.log("To do tasks:")} */}
      {/* {console.log(renderIncomplete)} */}
      {/* {console.log("Completed tasks:")} */}
      {/* {console.log(renderComplete)} */}
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
    // )
  );
}
