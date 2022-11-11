import { Link } from 'react-router-dom';
import { useUserContext } from '../components/userContext';
import { getDateString, getTimeString } from '../utils/getDateOrTimeString';

export default function About() {
  const { user } = useUserContext();
  const date = new Date(user.date);
  return (
    <div className='mt-7 ml-5 flex flex-col justify-center gap-4 items-center text-2xl'>
      <div className='text-4xl'>About Me</div>
      <div>Email: {user.email}</div>
      <div>
        Date of registration: {getDateString(date) + getTimeString(date)}
      </div>
      <Link to={`/notes/${user.id}`} className='hover:text-cyan-600 font-bold'>
        To notes
      </Link>
    </div>
  );
}
