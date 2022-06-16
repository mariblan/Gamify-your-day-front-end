import { TaskExpanded, TaskMini } from "./singleTask";
import taskDB from "./mockTaskDB";

// If tasklist is rendered in fulltasklist, no taskexpanded components are called
// if tasklist is rendered in mytasklist, only one taskexpanded component can be called

export default function TaskList({ fullList }) {
  return (
    <div className="taskWrapper">
      {!fullList && <TaskExpanded task={taskDB[3]} />}
      {taskDB.map((task, index) => (
        <TaskMini key={index} task={task} />
      ))}
    </div>
  );
}
