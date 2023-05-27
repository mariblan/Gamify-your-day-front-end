import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  GameIntro,
  Login,
  Register,
  RequireLogin,
  AllTasks,
  AnimalSelection,
  GetTask,
  TaskTimer,
  MyTaskList,
  TaskSuccess,
  TaskFailure,
  GameOver,
} from './components';
import { TaskProvider } from './taskContext';
import { checkValidToken } from './fetchDB/fetchDB';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const toastErrorSettings = {
    position: 'top-center',
    closeOnClick: true,
    hideProgressBar: true,
    theme: 'colored',
    autoClose: 2000,
  };

  useEffect(() => {
    const verifyLogin = async (token) => {
      try {
        const res = await checkValidToken(token);
        if (!res) throw new Error(`${res}`);
        setUser(res);
        setIsAuthenticated(true);
      } catch (error) {
        return toast.error(error.message, toastErrorSettings);
      }
    };
    token && verifyLogin(token);
  }, [token]);

  return (
    <Router>
      <TaskProvider
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        token={token}
        setToken={setToken}
        toastErrorSettings={toastErrorSettings}
        user={user}
        setUser={setUser}
      >
        <Routes>
          <Route path='/' element={<GameIntro />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='auth' element={<RequireLogin />}>
            <Route path='alltasks' element={<AllTasks />} />
            <Route path='mytasks' element={<MyTaskList />} />
            <Route path='petselection' element={<AnimalSelection />} />
            <Route path='gamego' element={<GetTask />} />
            <Route path='tasktimer' element={<TaskTimer />} />
            <Route path='tasksuccess' element={<TaskSuccess />} />
            <Route path='taskfailure' element={<TaskFailure />} />
            <Route path='gameover' element={<GameOver />} />
          </Route>
        </Routes>
      </TaskProvider>
      <ToastContainer />
    </Router>
  );
}

export default App;
