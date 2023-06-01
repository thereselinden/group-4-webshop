import Button from '@mui/material/Button';
import { useUserContext } from '../../context/UserContext';

type Props = {};

const UserProfile = (props: Props) => {
  const { logout } = useUserContext();
  return (
    <div>
      <h1>UserProfile</h1>
      <Button variant="contained" color="accent" onClick={() => logout()}>
        Logga ut
      </Button>
    </div>
  );
};

export default UserProfile;
