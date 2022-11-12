import { useUserContext } from '../components/UserContextProvider';
import { useFetcher, useLoaderData } from 'react-router-dom';
import API_PATH from '../utils/API_PATH';
import { getDateString } from '../utils/dateHelpers';
import sortDateRecent from '../utils/sortDateRecent';
import { useMemo } from 'react';
import Button from '../components/Button';
import useDeleteNote from '../hooks/useDeleteNote';
import CustomLink from '../components/CustomLink';
import Icon from '../components/Icon';

export const loader = async ({ params: { usId } }) => {
  const notes = await fetch(`${API_PATH}/notes?userId=${usId}`).then((r) =>
    r.json()
  );
  return { notes };
};

export function Notes() {
  const fetcher = useFetcher();
  const { user } = useUserContext();
  const { notes } = useLoaderData();
  const sortedNotes = useMemo(() => {
    const sorted = notes;
    return sorted.sort(sortDateRecent());
  }, [notes]);

  const handleDelete = useDeleteNote(fetcher);

  return (
    <div className='mt-5 ml-5 flex flex-col justify-start gap-4 items-center text-2xl'>
      <h2 className='font-bold text-3xl'>Notes</h2>
      <CustomLink path={`/notes/add`}>Add new note</CustomLink>
      {sortedNotes?.map((note) => (
        <div
          className='border border-solid border-black bg-zinc-100 px-2 rounded-lg w-full flex items-center'
          key={note.id}>
          <CustomLink path={`/notes/${user.id}/${note.id}`}>
            {note.title}
          </CustomLink>
          <span className='text-sm pl-5 '>
            {getDateString(new Date(note.date))}
          </span>
          <div className='ml-auto flex items-center gap-5'>
            <CustomLink path={`/notes/${note.userId}/${note.id}/edit`}>
              <Icon icon='edit' />
            </CustomLink>
            <Button handle={handleDelete(note)}>
              <Icon icon='delete' />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
