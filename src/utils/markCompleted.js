import redX from "../images/failed-task-icon.png";
import greenCheck from "../images/check-icon.png";

export default function markCompleted(taskId, successArr, failedArr) {
  if (successArr.includes(taskId)) {
    return (
      <img
        src={greenCheck}
        alt="A success check icon"
        className="taskConcluded"
      />
    );
  } else if (failedArr.includes(taskId)) {
    return (
      <img src={redX} alt="A red cross fail icon" className="taskConcluded" />
    );
  }
}
