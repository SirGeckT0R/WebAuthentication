import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { UserContextProvider } from './components/UserContextProvider';
import Layout from './routes/Layout';
import Login from './routes/Login';
import About from './routes/About';
import PageNotFound from './routes/PageNotFound';
import Register from './routes/Register';
import { Notes, loader as notesLoader } from './routes/Notes';
import { Note, loader as noteLoader } from './routes/Note';
import AddNewNote from './routes/AddNewNote';
import EditNote from './routes/EditNote';
import CheckForOtherUsers from './components/CheckForOtherUsers';
import deleteNote from './utils/deleteNote';
import Footer from './components/Footer';

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
        path: '/notes/:id/delete',
        action: deleteNote,
      },
      {
        path: '/notes/:usId',
        loader: notesLoader,
        element: (
          <CheckForOtherUsers>
            <Notes />
          </CheckForOtherUsers>
        ),
      },
      {
        path: '/notes/:usId/:id',
        loader: noteLoader,
        id: 'note',
        children: [
          {
            path: '/notes/:usId/:id',
            loader: noteLoader,
            element: (
              <CheckForOtherUsers>
                <Note />
              </CheckForOtherUsers>
            ),
          },
          {
            path: '/notes/:usId/:id/edit',
            element: (
              <CheckForOtherUsers>
                <EditNote />
              </CheckForOtherUsers>
            ),
          },
        ],
      },
      {
        path: '/notes/add',
        element: <AddNewNote />,
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
  {
    path: '*',
    element: <PageNotFound />,
  },
]);

function App() {
  return (
    <div className='w-10/12 my-5 mx-auto flex flex-col min-h-screen gap-5'>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
      <Footer />
    </div>
  );
}

export default App;
