import { useEffect, useState } from "react";
import { useTask } from "./taskContext";

import React from "react";

export default function todaysList() {
  const {
    gottenTask,
    setGottenTask,
    minutes,
    setMinutes,
    seconds,
    setSeconds,
  } = useTask();
}
