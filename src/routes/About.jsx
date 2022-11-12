import CustomLink from '../components/CustomLink';
import { useUserContext } from '../components/UserContextProvider';
import { getDateString, getTimeString } from '../utils/dateHelpers';

export default function About() {
  const { user } = useUserContext();
  const date = new Date(user.date);
  return (
    <div className='mt-7 ml-5 flex flex-col justify-center gap-4 items-center text-2xl'>
      <h2 className='text-4xl'>About Me</h2>
      <div>Email: {user.email}</div>
      <div>
        Date of registration: {getDateString(date) + getTimeString(date)}
      </div>
      <CustomLink path={`/notes/${user.id}`}>To notes</CustomLink>
    </div>
  );
}
