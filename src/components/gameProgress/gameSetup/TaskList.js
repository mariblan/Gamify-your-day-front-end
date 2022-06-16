import { TaskExpanded, TaskMini } from "./singleTask";
import { taskDB, userDB } from "./mockTaskDB";

// If tasklist is rendered in fulltasklist, no taskexpanded components are called
// if tasklist is rendered in mytasklist, only one taskexpanded component can be called

export default function TaskList({ fullList }) {
  return (
    // <div className="taskWrapper">
    //   {!fullList && <TaskExpanded task={taskDB[3]} user={userDB[0]} />}
    //   {taskDB.map((task, index) => (
    //     <TaskMini key={index} task={task} user={userDB[0]} />
    //   ))}
    // </div>
    <div className="taskWrapper">
      {taskDB.map((task, index) => (
        <TaskMini key={index} task={task} user={userDB[0]} />
      ))}
    </div>
  );
}
