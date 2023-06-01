import { PropsWithChildren } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

type Props = {
  children: PropsWithChildren;
};

const ProtectedRoute = ({ children }: Props) => {
  const { isLoggedIn } = useUserContext();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return navigate('/');
  }
  return children;
};
export default ProtectedRoute;
