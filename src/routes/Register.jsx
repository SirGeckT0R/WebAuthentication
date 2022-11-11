import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import API_PATH from '../utils/API_PATH';
import checkForSameEmail from '../utils/checkForSameEmail';

export default function Register() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);

  const [user, setUser] = useState({
    email: '',
    password: '',
    repeatedPassword: '',
  });

  const handleInputChange = useCallback((e) => {
    setUser((user) => ({ ...user, [e.target.name]: e.target.value }));
  }, []);

  const handleRegister = async () => {
    for (let key in user) {
      if (!user[key]) {
        setErrorMessage(`${key} is empty`);
        return;
      }
    }

    if (user.password !== user.repeatedPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }

    const userObject = {
      date: new Date(),
      ...user,
      email: user.email.toLowerCase(),
    };

    const { sameUsers } = await checkForSameEmail(userObject);

    if (sameUsers.length !== 0) {
      setErrorMessage('User with such email already exists');
    } else {
      await fetch(`${API_PATH}/users`, {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(() => {
          navigate('/');
        })
        .catch(() => {
          alert('Error');
        });
    }
  };
  return (
    <div className='mt-16 mx-5 flex flex-col gap-5 items-center text-2xl'>
      <input
        placeholder='email'
        name='email'
        type='email'
        onChange={handleInputChange}
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-2/5'
      />
      <input
        placeholder='password'
        name='password'
        type='password'
        onChange={handleInputChange}
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-2/5'
      />
      <input
        placeholder='repeat password'
        name='repeatedPassword'
        type='password'
        onChange={handleInputChange}
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-2/5'
      />
      <div className='h-7 underline text-red-400'>{errorMessage}</div>
      <button
        onClick={handleRegister}
        className='hover:text-cyan-600 font-bold'>
        Register
      </button>
    </div>
  );
}
