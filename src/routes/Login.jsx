import { useCallback, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUserContext } from '../components/userContext';
import API_PATH from '../utils/API_PATH';

export default function Login() {
  const userContext = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_PATH}/users`).then((r) => r.json());
  }, []);

  useEffect(() => {
    if (userContext.user?.email) {
      navigate('/');
    }
  }, [userContext.user, navigate]);

  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = useCallback((e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }, []);

  const handleLogin = useCallback(() => {
    for (let key in user) {
      if (!user[key]) {
        setErrorMessage(`${key} is empty`);
        return;
      }
    }
    fetch(
      `${API_PATH}/users?email=${user.email.toLowerCase()}&password=${
        user.password
      }`
    )
      .then((r) => r.json())
      .then((users) => {
        if (users.length === 1) {
          userContext.setUser(users[0]);
        } else {
          setErrorMessage('No such user or invalid password');
        }
      });
  }, [user, userContext]);

  return (
    <div className='mt-16 mx-5 flex flex-col gap-5 items-center text-2xl'>
      <input
        placeholder='email'
        name='email'
        onChange={handleInputChange}
        type='email'
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-2/5'
      />
      <input
        placeholder='password'
        name='password'
        onChange={handleInputChange}
        type='password'
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-2/5'
      />
      <div className='h-7 underline text-red-400'>{errorMessage}</div>
      <button onClick={handleLogin} className='hover:text-cyan-600 font-bold'>
        Login
      </button>

      <Link to='/register' className='hover:text-cyan-600 font-bold'>
        Don't have account? Register
      </Link>
    </div>
  );
}
