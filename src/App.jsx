import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContextProvider } from './components/userContext';
import Layout from './routes/Layout';
import Login from './routes/Login';
import About from './routes/About';
import PageNotFound from './routes/PageNotFound';
import Register from './routes/Register';
import { Notes, loader as notesLoader } from './routes/Notes';
import { Note, loader as noteLoader } from './routes/Note';
import AddNewNote from './routes/AddNewNote';
import EditNote from './routes/EditNote';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/',
        element: <About />,
      },
      {
        path: '/notes/:id',
        loader: notesLoader,
        element: <Notes />,
      },
      {
        path: '/notes/:usId/:id',
        loader: noteLoader,
        id: 'note',
        children: [
          {
            path: '/notes/:usId/:id',

            loader: noteLoader,
            element: <Note />,
          },
          {
            path: '/notes/:usId/:id/edit',
            element: <EditNote />,
          },
        ],
      },
      {
        path: '/notes/add',
        element: <AddNewNote />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

function App() {
  return (
    <div className='w-10/12 my-5 mx-auto flex flex-col min-h-screen gap-5 '>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <footer className='w-5/6 flex justify-between mt-auto mb-16 ml-5 border-black border-solid border-t-2'>
        <span>Created by: Logvinenko Anton</span>
        <span>BSU: 2022</span>
      </footer>
    </div>
  );
}

export default App;
