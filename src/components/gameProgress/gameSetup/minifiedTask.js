import { notFavIcon, redX, greenCheck } from '../../../images';
import {
  checkCategory,
  loadFavorites,
  toggleFavorites,
  selectTask,
  loadSelected,
} from '../../../utils';
import { useState, useEffect } from 'react';
import { useTask } from '../../../taskContext';

export default function TaskMini({ task: { _id, taskName, category } }) {
  const {
    user,
    favoriteList,
    setFavoriteList,
    todaysList,
    setTodaysList,
    todaysCompleted,
    todaysSuccess,
    todaysFailed,
  } = useTask();

  const { icon, alt } = checkCategory(category);
  const [favorite, setFavorite] = useState(notFavIcon);
  const [taskClass, setTaskClass] = useState('taskMini');

  // These two useEffects check the favorite and selected arrays from the user and
  // render selecton and favorite icons adequately.
  useEffect(() => {
    favoriteList && setFavorite(loadFavorites(_id, [...favoriteList]));
  }, [_id, favoriteList]);

  useEffect(() => {
    todaysList &&
      setTaskClass(loadSelected(_id, [...todaysList], [...todaysCompleted]));
  }, [_id, todaysList, todaysCompleted]);

  // Checks the state of the task and if it was succeeded or failed, it renders the adequate mark
  const checkCompletion = () => {
    const allSuccessIds = todaysSuccess.map((task) => task._id);
    const allFailedIds = todaysFailed.map((task) => task._id);

    if (allFailedIds.includes(_id)) {
      return <img src={redX} alt='An x icon' className='taskConcluded' />;
    } else if (allSuccessIds.includes(_id)) {
      return (
        <img
          src={greenCheck}
          alt='A green check icon'
          className='taskConcluded'
        />
      );
    }
  };

  return (
    user &&
    todaysList &&
    favoriteList && (
      <div
        className={taskClass}
        onClick={(e) =>
          selectTask(e, _id, user, todaysList).then((taskSelection) => {
            setTodaysList(taskSelection[0]);
            setTaskClass(taskSelection[1]);
          })
        }
      >
        {checkCompletion()}
        <img src={icon} alt={alt} />
        <h3>{taskName}</h3>
        <img
          name='favIcon'
          src={favorite}
          alt='A heart favorite icon'
          className='favIcon'
          onClick={async () =>
            await toggleFavorites(_id, user, favoriteList).then((data) => {
              if (data) {
                setFavoriteList(data[0]);
                setFavorite(data[1]);
              }
            })
          }
        />
      </div>
    )
  );
}
