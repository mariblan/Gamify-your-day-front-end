import { useState, useEffect } from "react";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import renderApples from "../../../utils/generateApples";
import { loadFavorites, toggleFavorites } from "../../../utils/displayFavorite";
import checkCategory from "../../../utils/categoryCheck";
import notFavIcon from "../../../images/fav-icon.png";
import { useTask } from "../../../taskContext";

export default function TaskConcluded({
  task: { _id, taskName, sliderValue, difficulty, reward, category, time },
}) {
  const { icon, alt } = checkCategory(category);
  const [favorite, setFavorite] = useState(notFavIcon);
  const { user, todaysSuccess, todaysFailed, favoriteList, setFavoriteList } =
    useTask();
  // const [allSuccessIds, setAllSuccessIds] = useState([]);
  // const [allFailedIds, setAllFailedIds] = useState([]);
  const [isFailed, setIsFailed] = useState(false);

  useEffect(() => {
    favoriteList && setFavorite(loadFavorites(_id, [...favoriteList]));
  }, [_id, favoriteList]);

  // useEffect(() => {
  //   todaysSuccess.forEach((task) =>
  //     setAllSuccessIds((prev) => [...prev, task._id])
  //   );
  //   todaysFailed.forEach((task) =>
  //     setAllFailedIds((prev) => [...prev, task._id])
  //   );
  // }, []);

  // const [successIds, setSuccessIds] = useState(
  //   todaysSuccess.map((task) => task._id)
  // );
  // const [failedIds, setFailedIds] = useState(
  //   todaysFailed.map((task) => task._id)
  // );
  // const [successIds, setSuccessIds] = useState([]);
  const [failedIds, setFailedIds] = useState([]);

  useEffect(() => {
    // setSuccessIds(todaysSuccess.map((task) => task._id));
    setFailedIds(todaysFailed.map((task) => task._id));
  }, []);

  const checkCompletion = () => {
    const allSuccessIds = todaysSuccess.map((task) => task._id);
    const allFailedIds = todaysFailed.map((task) => task._id);
    console.log(todaysSuccess);
    console.log(allSuccessIds);
    console.log(allFailedIds);

    if (allFailedIds.includes(_id)) {
      // setIsFailed(true);
      return <img src={redX} alt="An x icon" className="taskConcluded" />;
    } else if (allSuccessIds.includes(_id)) {
      return (
        <img
          src={greenCheck}
          alt="A green check icon"
          className="taskConcluded"
        />
      );
    }
  };

  return (
    <div className="taskExpanded">
      {checkCompletion()}
      <div className="taskMain">
        <img src={icon} alt={alt} />
        <div className="titleFavoriteWrapper">
          <img
            src={favorite}
            alt="favorite"
            className="favIcon"
            onClick={() =>
              toggleFavorites(_id, user, favoriteList).then((data) => {
                if (data) {
                  setFavoriteList(data[0]);
                  setFavorite(data[1]);
                }
              })
            }
          />
          <h2>{taskName}</h2>
        </div>
      </div>
      <div className="taskDescription">
        <div className="difficultyWrapperConcluded">
          <p className="difficultyConcluded">Difficulty</p>
          {!failedIds.includes(_id) && <p>Total Time</p>}
          {failedIds.includes(_id) && <p>Time</p>}
        </div>
        <div className="timeWrapperConcluded">
          {!failedIds.includes(_id) && (
            <div className="rewardWrapperConcluded">
              {difficulty} {renderApples("appleMini", reward)}
            </div>
          )}
          {!failedIds.includes(_id) && (
            <p>
              You took {time} out of {sliderValue}:00 min
            </p>
          )}
          {failedIds.includes(_id) && (
            <div className="rewardWrapperConcludedFailed">{difficulty}</div>
          )}
          {failedIds.includes(_id) && (
            <p>You had {sliderValue}:00 min for this task</p>
          )}
        </div>
      </div>
    </div>
  );
}
