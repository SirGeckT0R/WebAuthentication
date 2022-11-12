import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackLink from '../components/BackLink';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Error from '../components/Error';
import TextAreaNote from '../components/TextAreaNote';
import { useUserContext } from '../components/UserContextProvider';
import API_PATH from '../utils/API_PATH';
import checkForEmptyFields from '../utils/checkForEmptyFields';

export default function AddNewNote() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [note, setNote] = useState({ title: '', content: '' });

  const handleInputNoteChange = useCallback((e) => {
    setNote((note) => ({ ...note, [e.target.name]: e.target.value }));
  }, []);

  const [errorMessage, setErrorMessage] = useState(null);

  const handleSave = useCallback(() => {
    if (!checkForEmptyFields(note, setErrorMessage)) {
      return;
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
      .then(async (res) => {
        const { id } = await res.json();
        navigate(`/notes/${user.id}/${id}`);
      })
      .catch(() => {
        alert('Error');
      });
  }, [navigate, note, user]);

  return (
    <div className='mt-5 ml-5 flex flex-col justify-start gap-4 items-center text-2xl'>
      <div className='flex self-start justify-between w-full'>
        <BackLink path={`/notes/${user.id}`} />
        <h2 className='font-bold'>Add new note</h2>
      </div>
      <CustomInput
        placeholder='Title'
        name='title'
        onChange={handleInputNoteChange}
        className=' w-full'
      />
      <TextAreaNote
        placeholder='Add content'
        onChange={handleInputNoteChange}
      />

      <Error error={errorMessage} />
      <Button handle={handleSave}>Save note</Button>
    </div>
  );
}
