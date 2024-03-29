import './userAuth.css';
import { useNavigate } from 'react-router-dom';
import animals from '../../images/cover_bottom.png';
import applesTop from '../../images/cover_top.png';

export default function GameIntro() {
  const navigate = useNavigate();

  return (
    <div className='introPage' onClick={() => navigate('/login')}>
      <div className='applestop'>
        <img className='applestopimg' src={applesTop} alt='apples at the top' />
      </div>
      <h1 className='titleIntro'>Gamify Your Day</h1>
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
