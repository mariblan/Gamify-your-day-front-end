import './userAuth.css';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerUser } from '../../fetchDB/fetchDB';
import { useTask } from '../../taskContext';

export default function Register() {
  const { isAuthenticated, setToken, setFirstLogin, toastErrorSettings } =
    useTask();

  const [{ name, email, password }, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormState((prev) => ({ ...prev, [e.target.id]: e.target.value }));

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!name || !email || !password)
        return toast.error('Fill all the fields', toastErrorSettings);

      let nameValidation = '';
      let emailValidation = '';
      let pwdValidation = '';

      if (!name.match(/^[A-Za-z]+$/))
        nameValidation += 'Name can only contain numbers or characters';
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
        emailValidation += "Your email doesn't have the right format";
      if (password.length > 30 || password.length < 2)
        pwdValidation +=
          'Your password must have a minimum of 2 characters and a maximum of 30 characters';

      if (nameValidation || emailValidation || pwdValidation) {
        nameValidation && toast.error(nameValidation, toastErrorSettings);
        emailValidation && toast.error(emailValidation, toastErrorSettings);
        pwdValidation && toast.error(pwdValidation, toastErrorSettings);
        return;
      }

      const res = await registerUser({ name, email, password });
      if (res.token) {
        localStorage.setItem('token', res.token);
        setFirstLogin(true);
        return setToken(res.token);
      } else {
        return toast.error(res, toastErrorSettings);
      }
    } catch (error) {
      toast.error(error.stack, toastErrorSettings);
    }
  };

  if (isAuthenticated) return <Navigate to={'../auth/alltasks'} />;
  else
    return (
      <div className='registerWrapper'>
        <h1 className='registerTitle'>Register</h1>
        <form className='registerForm' onSubmit={handleSubmit}>
          <div className='infoWrapper'>
            <div className='registerLabelWrapper'>
              <label htmlFor='username'>Your username </label>
              <label htmlFor='email'>Your e-mail </label>
              <label htmlFor='password'>Your password </label>
            </div>
            <div className='registerInputWrapper'>
              <input
                type='text'
                name='newUsername'
                id='name'
                placeholder='Username'
                value={name}
                onChange={handleChange}
              />
              <input
                type='text'
                name='newEmail'
                id='email'
                placeholder='E-mail'
                value={email}
                onChange={handleChange}
              />
              <input
                type='password'
                name='newPassword'
                id='password'
                placeholder='Password'
                value={password}
                onChange={handleChange}
              />
            </div>
          </div>
          <button type='submit' className='mainButton largeButton'>
            Register
          </button>
        </form>
        <span className='changeAuth'>
          Already have an account?
          <button
            className='fadedButton smallButton'
            onClick={() => setTimeout(() => navigate('/login'), 150)}
          >
            Log in
          </button>
        </span>
      </div>
    );
}
