import { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import CustomLink from '../components/CustomLink';
import Error from '../components/Error';
import { useUserContext } from '../components/UserContextProvider';
import API_PATH from '../utils/API_PATH';
import checkForEmptyFields from '../utils/checkForEmptyFields';

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
    if (!checkForEmptyFields(user, setErrorMessage)) {
      return;
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
      })
      .catch(() => {
        setErrorMessage('Server error.');
      });
  }, [user, userContext]);

  return (
    <div className='mt-16 mx-5 flex flex-col gap-5 items-center text-2xl'>
      <CustomInput
        placeholder='email'
        name='email'
        onChange={handleInputChange}
        type='email'
        className='w-2/5'
      />
      <CustomInput
        placeholder='password'
        name='password'
        onChange={handleInputChange}
        type='password'
        className='w-2/5'
      />

      <Error error={errorMessage} />
      <Button handle={handleLogin}>Login</Button>

      <CustomLink path='/register'>Don't have account? Register</CustomLink>
    </div>
  );
}
