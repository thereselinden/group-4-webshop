import Typography from '@mui/material/Typography';
import { useUserContext } from '../../context/UserContext';

const Overview = () => {
  const { user } = useUserContext();

  return (
    <>
      <Typography variant="h4" component="h1">
        Hej {user?.firstName}
      </Typography>
      {user?.isAdmin ? (
        <Typography>
          Använd menyn för att se dina köp, hantera ordrar, uppdatera eller lägg
          till produkt!
        </Typography>
      ) : (
        <Typography>Använd menyn för att se alla dina köp!</Typography>
      )}
    </>
  );
};

export default Overview;
