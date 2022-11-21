import './notFound.css';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../../taskContext';

const NotFound = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useTask();

  return (
    <div className='introPage'>
      <div className='header404'>
        We could not find the page you were looking for...
      </div>
      {!isAuthenticated ? (
        <>
          <button
            className='fadedButton largeButton'
            onClick={() => setTimeout(() => navigate('/login'), 150)}
          >
            Login
          </button>
          <button
            className='fadedButton largeButton'
            onClick={() => setTimeout(() => navigate('/register'), 150)}
          >
            Register
          </button>
        </>
      ) : (
        <button
          className='fadedButton largeButton'
          onClick={() => setTimeout(() => navigate('/auth/alltasks'), 150)}
        >
          To my game
        </button>
      )}
    </div>
  );
};

export default NotFound;
