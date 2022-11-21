import './howToPlay.css';
import { useEffect } from 'react';
import { confirm } from 'react-confirm-box';
import { useTask } from '../../taskContext';

const HowToPlay = () => {
  const { firstLogin } = useTask();
  const title = 'How to Gamify your Day';

  const guideTabs = {};

  const options = {
    render: (step, onConfirm, onCancel) => {
      switch (step) {
        case '1':
          guideTabs.step = step;
          guideTabs.heading = 'Step 1:';
          guideTabs.body =
            'Firstly, select the tasks you want to complete. You can always come back and select more, or less, even after the game is over.';
          break;
        case '2':
          guideTabs.step = step;
          guideTabs.heading = 'Step 2:';
          guideTabs.body =
            'Proceed to select a pet. You can re-select a pet at any time until you start the game. Once you do, you will be bound to the pet you chose!';
          break;
        case '3':
          guideTabs.step = step;
          guideTabs.heading = 'Step 3:';
          guideTabs.body =
            "You can customize each task's difficulty level, for added challenge or in case of prolongued tasks.";
          break;
        case '4':
          guideTabs.step = step;
          guideTabs.heading = 'Step 4:';
          guideTabs.body =
            'Once you are happy with your selections, you can start the game! One of your selected tasks will be randomly assigned to you, and the countdown will start.';
          break;
        case '5':
          guideTabs.step = step;
          guideTabs.heading = 'Step 5:';
          guideTabs.body =
            'Finishing tasks in your chosen time will award you with apples to feed your pet! Forfeiting and task timeouts will not reward you with apples.';
          break;
        case '6':
          guideTabs.step = step;
          guideTabs.heading = 'Step 6:';
          guideTabs.body =
            'Once you accumulate enough apples to feed your pet, you win the game! Well done! You can still carry on doing tasks, even with a fed pet. Time to play!';
          break;
        default:
          guideTabs.step = step;
          guideTabs.heading = 'The goal of the game:';
          guideTabs.body = `This game is here to help you make your daily chores a bit more fun!
          Complete tasks in the time you choose to earn apples to feed a pet.
          Once your pet is fully fed, you win the game!`;
          break;
      }

      return (
        <div className='react-confirm-box gameIntro'>
          <p className='howToPlay' onClick={() => onCancel()}>
            x
          </p>
          <h2>{title}</h2>
          <h4>{guideTabs.heading}</h4>
          <p>{guideTabs.body}</p>
          <div className='confirm-box-btnWrapper'>
            <button
              className='smallButton'
              onClick={async () => {
                if (step === '0') return onCancel();
                await confirm(`${+step - 1}`, options);
              }}
            >
              {guideTabs.step === '0' ? 'Close' : 'Back'}
            </button>
            <button
              className='smallButton'
              onClick={async () => {
                if (step === '6') return onConfirm();
                await confirm(`${+step + 1}`, options);
              }}
            >
              {guideTabs.step === '6' ? 'Got it!' : 'Next'}
            </button>
          </div>
        </div>
      );
    },
  };

  const explainGame = async () => {
    return await confirm('0', options);
  };

  useEffect(() => {
    firstLogin && explainGame();
  }, []);

  return (
    <div className='howToPlay' onClick={explainGame}>
      ?
    </div>
  );
};

export default HowToPlay;
