import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useDeleteNote(fetcher, redirectPath) {
  const navigate = useNavigate();
  return useCallback(
    (note) => () => {
      fetcher.submit(note, {
        method: 'delete',
        action: `/notes/${note.id}/delete`,
      });
      if (redirectPath) {
        navigate(redirectPath);
      }
    },
    [fetcher, redirectPath, navigate]
  );
}
