import '../../genericComponents/howToPlay.css';
import { confirm } from 'react-confirm-box';
// import { useTask } from '../../../taskContext';

const ExplainTask = ({ easy, medium, hard }) => {
  // console.log(todaysList);

  const options = {
    render: (message, onConfirm, onCancel) => {
      return (
        <div className='react-confirm-box gameIntro'>
          <p className='howToTask' onClick={() => onCancel()}>
            x
          </p>
          <h4>{message}</h4>
          <p>
            <strong>Easy: </strong>
            {easy}
          </p>
          <p>
            <strong>Medium: </strong>
            {medium}
          </p>
          <p>
            <strong>Hard: </strong>
            {hard}
          </p>
        </div>
      );
    },
  };

  const explainTask = async () => {
    return await confirm('Difficulty tips', options);
  };

  return (
    <div className='howToTask' onClick={explainTask}>
      ?
    </div>
  );
};

export default ExplainTask;
