import { useUserContext } from './userContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const {
    user: { email },
  } = useUserContext();
  if (!email) {
    return <Navigate to='/login' />;
  }
  return children;
}
