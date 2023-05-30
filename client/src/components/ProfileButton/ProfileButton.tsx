import { useState } from 'react';

import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';
import UserModal from '../UserModal/UserModal';

type Props = {};

const ProfileButton = (props: Props) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton aria-label="add to shopping cart" onClick={handleOpen}>
        <LoginIcon color="textColor" />
      </IconButton>
      <UserModal handleClose={handleClose} open={open} />
    </>
  );
};

export default ProfileButton;
