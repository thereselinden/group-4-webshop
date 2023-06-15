import { Box, Typography } from '@mui/material';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Contact = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">Kontakt</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <LocalPhoneIcon />
        <Typography component="span">08-123 45 67</Typography>
      </Box>
    </Box>
  );
};

export default Contact;
