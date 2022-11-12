import { useUserContext } from './UserContextProvider';
import { useParams, useNavigate } from 'react-router-dom';

export default function CheckForOtherUsers({ children }) {
  const navigate = useNavigate();
  const { usId } = useParams();
  const {
    user: { id },
  } = useUserContext();

  if (usId && id.toString() !== usId) {
    navigate('/404');
  }
  return children;
}
