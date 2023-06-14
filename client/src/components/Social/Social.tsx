import { Box, Typography, Grid } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const Social = () => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="h6">Sociala medier</Typography>
      <Grid
        container
        item
        xs={12}
        spacing={1}
        sx={{ justifyContent: 'center', mt: 1, gap: 0.5 }}
      >
        <EmailIcon color="accent" />
        <FacebookIcon color="accent" />
        <InstagramIcon color="accent" />
        <GitHubIcon color="accent" />
      </Grid>
    </Box>
  );
};

export default Social;
