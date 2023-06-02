import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import Terms from '../Terms/Terms';
import Contact from '../Contact/Contact';
import Social from '../Social/Social';

type Props = {};

const Footer = (props: Props) => {
  return (
    <>
      <Grid
        container
        spacing={2}
        component="footer"
        sx={{ mt: 'auto', backgroundColor: '#eaeef2', p: 2, flexGrow: 1 }}
      >
        <Grid item xs={12} sm={4} sx={{ textAlign: 'center' }}>
          <Terms />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Contact />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Social />
        </Grid>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 2,
          }}
        >
          Copyright 2023 Grupp X Medieinstitutet
        </Box>
      </Grid>
    </>
  );
};

export default Footer;
