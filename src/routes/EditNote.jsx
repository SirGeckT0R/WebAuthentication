import { useCallback, useState } from 'react';
import { useNavigate, useRouteLoaderData } from 'react-router-dom';
import BackLink from '../components/BackLink';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Error from '../components/Error';
import TextAreaNote from '../components/TextAreaNote';
import { useUserContext } from '../components/UserContextProvider';
import API_PATH from '../utils/API_PATH';
import checkForEmptyFields from '../utils/checkForEmptyFields';

export default function EditNote() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { note } = useRouteLoaderData('note');
  const [noteState, setNoteState] = useState(note);

  const [errorMessage, setErrorMessage] = useState(null);
  const handleInputNoteChange = useCallback((e) => {
    setNoteState((note) => ({ ...note, [e.target.name]: e.target.value }));
  }, []);

  const handleSave = useCallback(() => {
    if (!checkForEmptyFields(noteState, setErrorMessage)) {
      return;
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
        <h2 className='font-bold'>Edit note</h2>
      </div>
      <CustomInput
        value={noteState.title}
        placeholder='Title'
        name='title'
        onChange={handleInputNoteChange}
        className='w-full'
      />
      <TextAreaNote
        value={noteState.content}
        placeholder='Add content'
        onChange={handleInputNoteChange}
      />
      <Error error={errorMessage} />
      <Button handle={handleSave}>Save note</Button>
    </div>
  );
}
