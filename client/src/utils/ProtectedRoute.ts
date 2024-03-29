import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../context/UserContext';

type Props = {
  children: ReactElement;
};

const ProtectedRoute = ({ children }: Props) => {
  const { user } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return navigate('/');
    }
  }, []);

  return children;
};
export default ProtectedRoute;
