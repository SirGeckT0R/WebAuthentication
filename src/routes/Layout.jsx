import { NavLink, Outlet, ScrollRestoration } from 'react-router-dom';
import { useUserContext } from '../components/userContext';

export default function Layout() {
  const user = useUserContext();
  const handleLogout = () => {
    user.setUser({ email: '' });
  };
  const userInfo = user.user;

  const handleActiveLink = ({ isActive }) => {
    return (
      ' ' + (isActive ? 'text-cyan-600 font-bold' : 'text-zinc-500 underline ')
    );
  };
  return (
    <div className='w-5/6 flex flex-col justify-center'>
      <ScrollRestoration />
      <header className='flex gap-6 ml-5 text-2xl '>
        <div className='text-xl self-center mr-auto'>
          Hello,{userInfo.email}
        </div>
        <NavLink to='/' className={handleActiveLink}>
          About
        </NavLink>
        <NavLink to={`/notes/${userInfo.id}`} className={handleActiveLink}>
          Notes
        </NavLink>
        <NavLink onClick={handleLogout} className='text-zinc-500 underline'>
          Log out
        </NavLink>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
