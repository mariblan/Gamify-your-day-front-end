import { Outlet, Navigate } from 'react-router-dom';
import { useTask } from '../../taskContext';
import HowToPlay from '../genericComponents/HowToPlay';

const RequireLogin = () => {
  const { isAuthenticated } = useTask();

  return (
    <>
      <HowToPlay />
      {isAuthenticated ? <Outlet /> : <Navigate to='/login' />}
    </>
  );
};

export default RequireLogin;
