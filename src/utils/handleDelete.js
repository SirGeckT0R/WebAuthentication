import API_PATH from './API_PATH';

export const handleDelete = (note) => (e) => {
  fetch(`${API_PATH}/notes/${note.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  }).then(() => window.location.reload(false));
};
