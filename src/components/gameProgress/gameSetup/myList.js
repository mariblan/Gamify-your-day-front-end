import TaskExpanded from './expandedTask';
import TaskConcluded from './taskConcluded';
import { useState, useEffect } from 'react';
import { useTask } from '../../../taskContext';

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

  return (
    <div className="taskWrapper">
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
