import { useUserContext } from '../components/userContext';
import { Link, useLoaderData } from 'react-router-dom';
import API_PATH from '../utils/API_PATH';
import { getDateString } from '../utils/getDateOrTimeString';
import sortDateRecent from '../utils/sortDateRecent';
import { handleDelete } from '../utils/handleDelete';

export const loader = async ({ params: { id } }) => {
  const notes = await fetch(`${API_PATH}/notes?userId=${id}`).then((r) =>
    r.json()
  );
  return { notes };
};

export function Notes() {
  const { user } = useUserContext();
  const { notes } = useLoaderData();
  notes.sort(sortDateRecent());

  return (
    <div className='mt-5 ml-5 flex flex-col justify-start gap-4 items-center text-2xl'>
      <div className='font-bold text-3xl'>Notes</div>
      <Link to={`/notes/add`} className='hover:text-cyan-600 font-bold'>
        Add new note
      </Link>
      {notes?.map((note) => (
        <div
          className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full flex items-center'
          key={note.id}>
          <Link
            to={`/notes/${user.id}/${note.id}`}
            className='hover:text-cyan-600'>
            {note.title}
          </Link>
          <span className='text-sm pl-5 '>
            {getDateString(new Date(note.date))}
          </span>
          <div className='ml-auto flex items-center gap-5'>
            <Link to={`/notes/${note.userId}/${note.id}/edit`}>
              <img alt='edit' height='20px' width='20px' src='/img/edit.png' />
            </Link>
            <button onClick={handleDelete(note)}>
              <img
                alt='delete'
                height='20px'
                width='20px'
                src='/img/delete.png'
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
