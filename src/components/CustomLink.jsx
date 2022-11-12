import { Link } from 'react-router-dom';
export default function CustomLink({ children, path }) {
  return (
    <Link to={path} className='hover:text-cyan-600 font-bold'>
      {children}
    </Link>
  );
}
