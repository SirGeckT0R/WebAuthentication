import { useCallback, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { useUserContext } from '../components/userContext';
import API_PATH from '../utils/API_PATH';

export default function EditNote() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const {
    note: [firstNote],
  } = useRouteLoaderData('note');
  const [noteState, setNoteState] = useState(firstNote);

  const [errorMessage, setErrorMessage] = useState(null);
  const handleInputNoteChange = useCallback((e) => {
    setNoteState((note) => ({ ...note, [e.target.name]: e.target.value }));
  }, []);

  const handleSave = useCallback(() => {
    for (let key in noteState) {
      if (!noteState[key]) {
        setErrorMessage(`${key} is empty`);
        return;
      }
    }
    fetch(`${API_PATH}/notes/${noteState.id}`, {
      method: 'PUT',
      body: JSON.stringify(noteState),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        navigate(`/notes/${user.id}/${noteState.id}`);
      })
      .catch(() => {
        alert('Error');
      });
  }, [navigate, noteState, user]);

  return (
    <div className='mt-5  ml-5 flex flex-col justify-start gap-4 items-center text-2xl'>
      <div className='flex self-start justify-between w-full'>
        <BackLink path={`/notes/${user.id}`} />
        <div className='font-bold'>Edit note</div>
      </div>
      <input
        value={noteState.title}
        placeholder='Title'
        name='title'
        onChange={handleInputNoteChange}
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full'
      />
      <textarea
        value={noteState.content}
        placeholder='Add content'
        rows='4'
        name='content'
        onChange={handleInputNoteChange}
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full'
      />

      <div className='h-2 text-xl underline text-red-400'>{errorMessage}</div>
      <button onClick={handleSave} className='hover:text-cyan-600 font-bold'>
        Save note
      </button>
    </div>
  );
}
