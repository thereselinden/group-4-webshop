import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    textColor: { main: string; light: string };
  }
  interface PaletteOptions {
    textColor: { main: string; light: string };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    textColor: true;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#EBEBEB',
    },
    textColor: { main: '#565252', light: '#ccc' },
  },
});
