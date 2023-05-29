import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';

type Props = {};

const ProfileButton = (props: Props) => {
  return (
    <IconButton aria-label="add to shopping cart">
      <LoginIcon color="textColor" />
    </IconButton>
  );
};

export default ProfileButton;
