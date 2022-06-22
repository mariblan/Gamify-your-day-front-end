import { useState } from "react";
import { useNavigate } from "react-router-dom";

// const timerSeconds = () => {
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(3);
//   const [timerInit, setTimerInit] = useState(false);
//   const navigate = useNavigate();
//   if (timerInit === true && seconds > 0) {
//     setTimeout(() => {
//       setSeconds((prevS) => prevS - 1);
//     }, 1000);
//   } else if (timerInit === true && seconds === 0 && minutes > 0) {
//     setTimeout(() => {
//       setSeconds(59);
//       setMinutes((prevM) => prevM - 1);
//     }, 1000);
//   } else if (timerInit === true && seconds === 0 && minutes === 0) {
//     setTimeout(() => {
//       clearTimeout();
//       navigate("/taskfailure");
//     });
//   }
// };

// export { timerSeconds };
