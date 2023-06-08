import Typography from '@mui/material/Typography';
import { useUserContext } from '../../context/UserContext';

const Overview = () => {
  const { user } = useUserContext();

  return (
    <Typography variant="h4" component="h1">
      Hej {user?.firstName}
    </Typography>
  );
};

export default Overview;
