import { useFetcher, useLoaderData, redirect } from 'react-router-dom';
import BackLink from '../components/BackLink';
import Button from '../components/Button';
import { useUserContext } from '../components/UserContextProvider';
import API_PATH from '../utils/API_PATH';
import useDeleteNote from '../hooks/useDeleteNote';
import CustomLink from '../components/CustomLink';
import TextAreaNote from '../components/TextAreaNote';
import Icon from '../components/Icon';

export const loader = async ({ params: { usId, id } }) => {
  const notes = await fetch(`${API_PATH}/notes?id=${id}&userId=${usId}`).then(
    (r) => r.json()
  );
  if (notes.length === 0) {
    return redirect('/404');
  }
  const note = notes[0];
  return { note };
};

export function Note() {
  const fetcher = useFetcher();
  const { user } = useUserContext();
  const { note } = useLoaderData();

  const handleDelete = useDeleteNote(fetcher, `/notes/${user.id}`);

  return (
    <div className='mt-5 ml-5 flex flex-col justify-between gap-4 items-center text-2xl h-80'>
      <div className='flex self-start justify-between w-full'>
        <BackLink path={`/notes/${user.id}`} />
        <h2 className='font-bold self-center'>{note.title}</h2>
        <div className=' flex items-center gap-5'>
          <CustomLink path={`/notes/${note.userId}/${note.id}/edit`}>
            <Icon icon='edit' />
          </CustomLink>
          <Button handle={handleDelete(note)}>
            <Icon icon='delete' />
          </Button>
        </div>
      </div>

      <TextAreaNote value={note.content} disabled className='h-5/6' />
    </div>
  );
}
