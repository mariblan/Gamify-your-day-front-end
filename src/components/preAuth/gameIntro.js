import './userAuth.css';
import { useNavigate } from 'react-router-dom';
import { animals, applesTop } from '../../images';

export default function GameIntro() {
  const navigate = useNavigate();

  return (
    <div className='introPage' onClick={() => navigate('/login')}>
      <div className='applestop'>
        <img className='applestopimg' src={applesTop} alt='apples at the top' />
      </div>
      <h1 className='titleIntro'>Gamify Your day</h1>
      <div className='animals'>
        <img
          className='animalsbottom'
          src={animals}
          alt='animals at the bottom'
        />
      </div>
    </div>
  );
}
