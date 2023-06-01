import { useState } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import UserModal from '../UserModal/UserModal';
import { useUserContext } from '../../context/UserContext';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

type Props = {};

const ProfileButton = (props: Props) => {
  const [open, setOpen] = useState(false);
  console.log('modal state ', open);

  const { isLoggedIn } = useUserContext();

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      {!isLoggedIn ? (
        <>
          <IconButton aria-label="add to shopping cart" onClick={handleOpen}>
            <LoginIcon color="textColor" />
          </IconButton>
          <UserModal handleClose={handleClose} open={open} />
        </>
      ) : (
        <Link to="/profile">
          <IconButton aria-label="go to profile page">
            <PermIdentityIcon color="textColor" />
          </IconButton>
        </Link>
      )}
    </>
  );
};

export default ProfileButton;
