import API_PATH from './API_PATH';

export default async function deleteNote({ params }) {
  fetch(`${API_PATH}/notes/${params.id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
  });
}
