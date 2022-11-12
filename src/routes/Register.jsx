import { useNavigate } from 'react-router-dom';
import { useState, useCallback } from 'react';
import API_PATH from '../utils/API_PATH';
import checkIsUserExists from '../utils/checkIsUserExists';
import Button from '../components/Button';
import Error from '../components/Error';
import CustomInput from '../components/CustomInput';
import { useUserContext } from '../components/UserContextProvider';
import checkForEmptyFields from '../utils/checkForEmptyFields';

export default function Register() {
  const userContext = useUserContext();
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
    if (!checkForEmptyFields(user, setErrorMessage)) {
      return;
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
    const { sameUsers } = await checkIsUserExists(userObject);

    if (sameUsers.length !== 0) {
      setErrorMessage('User with such email already exists');
    } else {
      await fetch(`${API_PATH}/users`, {
        method: 'POST',
        body: JSON.stringify(userObject),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(async (res) => {
          const user = await res.json();
          userContext.setUser(user);
          navigate(`/`);
        })
        .catch(() => {
          setErrorMessage('Server error.');
        });
    }
  };
  return (
    <div className='mt-16 mx-5 flex flex-col gap-5 items-center text-2xl'>
      <CustomInput
        placeholder='email'
        name='email'
        type='email'
        onChange={handleInputChange}
        className='w-2/5'
      />
      <CustomInput
        placeholder='password'
        name='password'
        type='password'
        onChange={handleInputChange}
        className='w-2/5'
      />
      <CustomInput
        placeholder='repeat password'
        name='repeatedPassword'
        type='password'
        onChange={handleInputChange}
        className='w-2/5'
      />
      <Error error={errorMessage} />
      <Button handle={handleRegister}>Register</Button>
    </div>
  );
}
