import appleColor from '../../../images/apple-color.png';
import { addFailed, removeFromToday } from '../../../fetchDB/fetchDB';
import './gameGo.css';
import { useTask } from '../../../taskContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { confirm } from 'react-confirm-box';

export default function GameGo({ getTask, clicked }) {
  const {
    counter,
    setCounter,
    selectedPet,
    setSelectedPet,
    userSettings,
    todaysList,
    setTodaysList,
    gottenTask,
    forfeited,
    setForfeited,
    setNextClicked,
    disabled,
    setDisabled,
    setGottenTask,
    setPaused,
    setUserSettings,
    setTodaysFailed,
    setTodaysCompleted,
    user,
    breakInterval,
    setBreakInterval,
  } = useTask();

  const navigate = useNavigate();

  //ref to use in the button so when clicking in the "strat" on the apple also triggers the button focus
  const focusBtn = useRef(null);

  useEffect(() => {
    setCounter('Start!');
  }, []);

  useEffect(() => {
    setDisabled(false);
  }, []);

  useEffect(() => {
    setGottenTask(false);
  }, []);

  const navigateToList = () => setTimeout(navigate('../mytasks'), 150);
  return (
    <div>
      <button
        onClick={() => {
          navigate('../mytasks');
        }}
        className='menu'
        type='menu'
      >
        My list
      </button>
      <div className='gamegobody'>
        {clicked === false ? (
          <h2 className='title'>Give me a random task!</h2>
        ) : (
          <h2 className='title'>Your next task is...</h2>
        )}
        <button
          ref={focusBtn}
          disabled={disabled}
          id='a'
          className={userSettings.length === 0 ? 'applebtnnotask' : 'applebtn'}
          type='button'
          onClick={() => {
            if (!gottenTask) {
              getTask();
            }
          }}
          value='Click'
        >
          <img
            id='applebtnimage'
            className='applebtnimage'
            src={appleColor}
            alt='red apple'
          />
        </button>
        <div
          onClick={() => {
            if (!gottenTask) {
              getTask();
            }
            focusBtn.current.focus();
          }}
          className='start'
        >
          {counter}
        </div>
      </div>
      {clicked === true && (
        <div className='gottentask'>
          <h4>{gottenTask.taskName}</h4>
        </div>
      )}
    </div>
  );
}
