import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackLink from '../components/BackLink';
import { useUserContext } from '../components/userContext';
import API_PATH from '../utils/API_PATH';

export default function AddNewNote() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [note, setNote] = useState({ title: '', content: '' });

  const handleInputNoteChange = useCallback((e) => {
    setNote((note) => ({ ...note, [e.target.name]: e.target.value }));
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSave = useCallback(() => {
    for (let key in note) {
      if (!note[key]) {
        setErrorMessage(`${key} is empty`);
        return;
      }
    }
    const noteObject = {
      date: new Date(),
      userId: user.id,
      ...note,
    };
    fetch(`${API_PATH}/notes`, {
      method: 'POST',
      body: JSON.stringify(noteObject),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        navigate(`/notes/${user.id}`);
      })
      .catch(() => {
        alert('Error');
      });
  }, [navigate, note, user]);

  return (
    <div className='mt-5 ml-5 flex flex-col justify-start gap-4 items-center text-2xl'>
      <div className='flex self-start justify-between w-full'>
        <BackLink path={`/notes/${user.id}`} />
        <div className='font-bold'>Add new note</div>
      </div>
      <input
        placeholder='Title'
        name='title'
        onChange={handleInputNoteChange}
        className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full'
      />
      <textarea
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
