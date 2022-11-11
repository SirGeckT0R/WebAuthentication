import { Link, useLoaderData } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { useUserContext } from '../components/userContext';
import API_PATH from '../utils/API_PATH';
import { handleDelete } from '../utils/handleDelete';

export const loader = async ({ params: { id } }) => {
  const note = await fetch(`${API_PATH}/notes?id=${id}`).then((r) => r.json());
  return { note };
};

export function Note() {
  const { user } = useUserContext();
  const {
    note: [firstNote],
  } = useLoaderData();

  return (
    <div className='mt-5 ml-5 flex flex-col justify-between gap-4 items-center text-2xl h-80'>
      <div className='flex self-start justify-between w-full'>
        <BackLink path={`/notes/${user.id}`} />
        <div className='font-bold self-center'>{firstNote.title}</div>
        <div className=' flex items-center gap-5'>
          <Link to={`/notes/${firstNote.userId}/${firstNote.id}/edit`}>
            <img alt='edit' height='20px' width='20px' src='/img/edit.png' />
          </Link>
          <button onClick={handleDelete(firstNote)}>
            <img
              alt='delete'
              height='20px'
              width='20px'
              src='/img/delete.png'
            />
          </button>
        </div>
      </div>

      <textarea
        value={firstNote.content}
        rows='4'
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full h-5/6'
        disabled
      />
    </div>
  );
}
