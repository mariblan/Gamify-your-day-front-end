import { useState, useEffect } from "react";
import redX from "../../../images/failed-task-icon.png";
import greenCheck from "../../../images/check-icon.png";
import renderApples from "../../../utils/generateApples";
import { loadFavorites } from "../../../utils/displayFavorite";
import checkCategory from "../../../utils/categoryCheck";
import notFavIcon from "../../../images/fav-icon.png";
import { useTask } from "../../../taskContext";

export default function TaskConcluded({
  task: { _id, taskName, sliderValue, difficulty, reward, category, time },
}) {
  const { icon, alt } = checkCategory(category);
  const [favorite, setFavorite] = useState(notFavIcon);
  const { todaysSuccess, todaysFailed, favoriteList } = useTask();
  const [allSuccessIds, setSuccessIds] = useState([]);
  const [allFailedIds, setFailedIds] = useState([]);
  const [isFailed, setIsFailed] = useState(false);

  const checkCompletion = () => {
    if (allFailedIds.includes(_id)) {
      setIsFailed(true);
      return <img src={redX} alt="An x icon" className="taskConcluded" />;
    }
    if (allSuccessIds.includes(_id)) {
      return (
        <img
          src={greenCheck}
          alt="A green check icon"
          className="taskConcluded"
        />
      );
    }
  };

  useEffect(() => {
    favoriteList && setFavorite(loadFavorites(_id, [...favoriteList]));
  }, [_id, favoriteList]);

  useEffect(() => {
    todaysSuccess.forEach((task) =>
      setSuccessIds((prev) => [...prev, task._id])
    );
    todaysFailed.forEach((task) => setFailedIds((prev) => [...prev, task._id]));
  }, []);

  return (
    allSuccessIds &&
    allFailedIds && (
      <div className="taskExpanded">
        {console.log(allFailedIds)}
        {console.log(allSuccessIds)}
        {checkCompletion()}
        <div className="taskMain">
          <img src={icon} alt={alt} />
          <div className="titleFavoriteWrapper">
            <img
              src={favorite}
              alt="favorite"
              className="favIcon"
              // onClick={}
            />
            <h2>{taskName}</h2>
          </div>
        </div>
        {/* <div className="rewardDisplay">
        <div className="rewardText">Reward: </div>
        <div className="rewardWrapper">
          {renderApples("appleExpanded", reward)}
        </div>
      </div> */}
        <div className="taskDescription">
          <div className="difficultyWrapperConcluded">
            <p className="difficultyConcluded">Difficulty</p>
            {!isFailed && <p>Total Time</p>}
          </div>
          <div className="timeWrapperConcluded">
            <div className="rewardWrapperConcluded">
              {difficulty} {renderApples("appleMini", reward)}
            </div>
            {!isFailed && (
              <p>
                You took {time} out of {sliderValue}:00 min
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
}
