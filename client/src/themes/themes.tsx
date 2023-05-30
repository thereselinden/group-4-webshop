import { createTheme } from '@mui/material/styles';
import { yellow, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    textColor: { main: string; light: string };
    accent: { background: string; color: string };
  }
  interface PaletteOptions {
    textColor: { main: string; light: string };
    accent: { main: string };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    textColor: true;
    accent: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    textColor: true;
    accent: true;
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
    textColor: { main: grey[800] },
    accent: { main: yellow[600] },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
  },
});
