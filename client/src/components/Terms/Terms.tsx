import { Box, Typography, Link } from '@mui/material';
type Props = {};

const Terms = (props: Props) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">Information</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Link href="#" underline="hover" color="textColor">
          Villkor och regler
        </Link>
        <Link href="#" underline="hover" color="textColor">
          Integritietspolicy
        </Link>
        <Link href="#" underline="hover" color="textColor">
          Kontakt
        </Link>
        <Link href="#" underline="hover" color="textColor">
          Mitt konto
        </Link>
      </Box>
    </Box>
  );
};

export default Terms;
