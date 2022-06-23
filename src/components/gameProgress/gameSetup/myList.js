import TaskMini from "./minifiedTask";
import TaskExpanded from "./expandedTask";
import { getUser } from "../../../fetchDB/fetchDB";

import { useState, useEffect } from "react";

// If tasklist is rendered in fulltasklist, no taskexpanded components are called
// if tasklist is rendered in mytasklist, only one taskexpanded component can be called

export default function MyList() {
  // filter category will take the tasbDB mock and the filter name (if any) and return only objects
  // that match the filtering
  // console.log(searchValue);
  //!!! displayedTasks needs to have only the tasks inside the user's daily list (if any)
  const [user, setUser] = useState(false);
  const [displayedTasks, setDisplayedTasks] = useState(false);

  useEffect(() => {
    getUser("62b1b57082c8ed601e7094fc").then((user) => setUser(user));
  }, []);

  return (
    user && (
      <div className="taskWrapper">
        {/* !!! Very placeholder component call for the sake of visibility - needs to be called on click* */}
        <TaskExpanded task={user.todayList[0]} user={user} />
        {console.log(user.todayList[0])}
        {user.todayList.map((task, index) => (
          <TaskMini key={index} task={task} user={user} />
        ))}
      </div>
    )
  );
}
