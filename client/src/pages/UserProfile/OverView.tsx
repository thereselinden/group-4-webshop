import Typography from '@mui/material/Typography';
import { useUserContext } from '../../context/UserContext';

type Props = {};

const Overview = (props: Props) => {
  const { user, logout } = useUserContext();

  return (
    <Typography variant="h4" component="h1">
      Hej {user?.firstName}
    </Typography>
  );
};

export default Overview;
