import MyList from './myList';
import { reload } from '../../../images';
import { renderApples } from '../../../utils';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTask } from '../../../taskContext';
import { toast } from 'react-toastify';
import { confirm } from 'react-confirm-box';

export default function MyTaskList() {
  const {
    user,
    userProgress,
    todaysList,
    selectedPet: { name, mood, hungerlevel },
    nextClicked,
    canChangePet,
    setCanChangePet,
    setNextClicked,
    toastErrorSettings,
    logOutConfirm,
    disabled,
    setDisabled,
  } = useTask();
  const navigate = useNavigate();

  const [showConcluded, setShowConcluded] = useState(false);

  useEffect(() => {
    setDisabled(false);
  }, []);

  useEffect(() => {
    clearTimeout();
  }, []);

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className='react-confirm-box'>
          <h4>
            Once you start the game you won't be able to select a different pet
            later on. Would you like to continue?
          </h4>
          <div className='confirm-box-btnWrapper'>
            <button
              onClick={() => {
                onCancel();
                setDisabled(false);
              }}
            >
              Back
            </button>
            <button
              onClick={() => {
                onConfirm();
                setDisabled(false);
                setNextClicked(true);
                setTimeout(() => navigate('../gamego'), 150);
                setCanChangePet(false);
              }}
            >
              Start!
            </button>
          </div>
        </div>
      );
    },
  };

  // Sets the trigger for the values of each task in the today
  // to be stored and be passable to the task randomizer
  const giveSignal = async () => {
    if (todaysList.length === 0) {
      toast.error(
        'Please select at least one task before proceeding!',
        toastErrorSettings
      );
    } else {
      if (canChangePet) {
        setDisabled(true);
        await confirm('Start the game?', options);
      } else {
        setNextClicked(true);
        setTimeout(() => navigate('../gamego'), 150);
      }
    }
  };

  const toggleConcluded = () => {
    showConcluded ? setShowConcluded(false) : setShowConcluded(true);
  };

  const navigateToTasks = () => {
    setTimeout(() => navigate('../alltasks'), 150);
  };

  const navigateToPets = () => {
    setTimeout(() => navigate('../petselection'), 150);
  };

  return (
    <>
      <div className='headerWrapper'>
        <h1 className='userWelcome'>Welcome back {user.name}!</h1>
        <button
          className='profileBtn fadedBtn'
          onClick={() => {
            logOutConfirm();
            setDisabled(true);
          }}
        >
          Log out
        </button>
        <h1 className='titleMyList'>Today's task list</h1>
      </div>
      <div className='fixedTaskWrapper'>
        <MyList showConcluded={showConcluded} />
      </div>
      <footer>
        <div className='dailyPet'>
          <h3>My pet for today</h3>
          <div className='imgWrapper'>
            <img
              src={mood ? mood[0] : `No pet selected`}
              alt={`A ${name}` || `No pet selected`}
              className='animal'
            />
            {canChangePet && (
              <div className='changeAnimal'>
                <img
                  src={reload}
                  alt='A reload icon'
                  onClick={navigateToPets}
                />
              </div>
            )}
          </div>
          <div className='appleWrapper'>
            {renderApples('appleIcon', userProgress, hungerlevel)}
          </div>
        </div>
        <div className='navWrapper'>
          <button
            disabled={disabled}
            type='button'
            className='fadedBtn'
            onClick={navigateToTasks}
          >
            Task selection
          </button>
          <button
            disabled={disabled}
            type='button'
            className='fadedBtn'
            onClick={toggleConcluded}
          >
            {!showConcluded ? 'Completed tasks' : 'Incomplete tasks'}
          </button>
          {!showConcluded && (
            <button
              disabled={disabled}
              type='button'
              className='mainBtn'
              onClick={() => {
                giveSignal();
              }}
            >
              Start!
            </button>
          )}
          {/* <button type="button" className="fadedBtn" onClick={navigateToTasks}>
            Task selection
          </button>
          <button type="button" className="fadedBtn" onClick={toggleConcluded}>
            {!showConcluded ? "Completed tasks" : "Incomplete tasks"}
          </button>
          <button type="button" className="mainBtn" onClick={giveSignal}>
            Start!
          </button> */}
        </div>
      </footer>
    </>
  );
}
