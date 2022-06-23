import { useTask } from "./taskContext";
import { useState } from "react";

export default function UserInfo() {
  const {
    user,
    setUser,
    todaysList,
    setTodaysList,
    todaysCompleted,
    setTodaysCompleted,
    todaysFailed,
    setTodaysFailed,
    gottenTask,
    setGottenTask,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();

  user && console.log(todaysList);
  const category = "work";
  const taskname = "paperwork";
  const task = {
    category,
    taskname,
  };

  const [randomizeTask, setRandomizeTask] = useState();
  // console.log(task);
  const todaysRandomizeList = [];

  // const todaysRandomizeList: [
  //   {
  //     _id: ObjectId("62b1c2453ee384607516f8f4"),
  //     category: String("care"),
  //     taskName: String("Go for a walk"),
  //     taskTime: Number (15),
  //     taskDifficulty: String ("Medium")
  //   },
  // ]

  // todaysRandomizeList([...todaysList], taskTime, taskDifficulty)

  // const todaysRandomizeList = (todaysListArray, taskTime, taskDifficulty) => {
  //   let randomizeArray = [];

  //   for (let task in todaysList) {
  //     const {id, taskName, category} = task
  //     const id = task.id
  //     const taskName = task.taskName
  //     const category = task.category
  //     randomizeArray.push({id, taskName, category, ?taskTime?, ?taskDifficulty?})
  //   }

  //   return randomizeArray;
  // }
}
