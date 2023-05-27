import { useTask } from '../../../taskContext';
import { renderApples } from '../../../utils';
import './gameOver.css';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function GameOver() {
  const {
    selectedPet,
    setSelectedPet,
    logOut,
    gameFinalScreen,
    setGameFinalScreen,
    disabled,
    setDisabled,
    logOutConfirm,
  } = useTask();

  //To use in setTimeout to navigate to the failure and succes screens.
  const navigate = useNavigate();

  //Setting the buttons disabled value to false so they work as they keep getting disabled upon mount.
  useEffect(() => {
    setDisabled(false);
  }, []);

  //Upon clicking "continue" it redirects you to the apple button so the user can get another randome task and keep playing
  //and it sets the gameFinalScreen to false so it wont redirec the user again to that upon succeding the next tasks.
  const continueClick = () => {
    setGameFinalScreen(false);
    navigate('../gamego');
  };

  return (
    <div className='gameoverscreen'>
      <button
        className='menu'
        onClick={() => {
          logOutConfirm();
          setDisabled(true);
        }}
      >
        Log Out
      </button>
      <div className='gameovercontainer'>
        <div className='completiontext'>
          <h3>{selectedPet.completion} </h3>
        </div>
        <div className='imagesend'>
          <img
            src={selectedPet.mood[1]}
            className={selectedPet.name}
            alt={selectedPet.name}
          />
          {selectedPet !== 'hamster' ? (
            <div className='applesendwrap'>
              {renderApples('applesendwrapimg', selectedPet.hungerlevel)}
            </div>
          ) : (
            <div className='applesend'>
              {renderApples('applesendimg', selectedPet.hungerlevel)}
            </div>
          )}
        </div>
      </div>
      <div className='continue'>
        {/* <button disabled={disabled} onClick={continueClick} className="mainBtn">
          Continue
        </button> */}
        <button
          disabled={disabled}
          onClick={() => {
            continueClick();
          }}
          className='mainBtn'
        >
          Continue
        </button>
      </div>
    </div>
  );
}
