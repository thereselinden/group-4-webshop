import { Link } from 'react-router-dom';

import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

import UserModal from '../UserModal/UserModal';
import { useUserContext } from '../../context/UserContext';

const ProfileButton = () => {
  const { user, setUserModal } = useUserContext();

  return (
    <>
      {!user ? (
        <>
          <IconButton aria-label="login" onClick={() => setUserModal(true)}>
            <LoginIcon color="textColor" />
          </IconButton>
          <UserModal />
        </>
      ) : (
        <Link to="/profile/overview">
          <IconButton aria-label="go to profile page">
            <PermIdentityIcon color="textColor" />
          </IconButton>
        </Link>
      )}
    </>
  );
};

export default ProfileButton;
