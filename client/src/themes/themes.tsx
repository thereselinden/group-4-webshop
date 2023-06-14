import { createTheme } from '@mui/material/styles';
import { yellow, grey } from '@mui/material/colors';

declare module '@mui/material/styles' {
  interface Palette {
    textColor: { main: string };
    accent: { main: string };
  }
  interface PaletteOptions {
    textColor: { main: string };
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

declare module '@mui/material/Badge' {
  interface BadgePropsColorOverrides {
    accent: true;
  }
}

declare module '@mui/material/InputLabel' {
  interface InputLabelClassesPropsColorOverrides {
    textColor: true;
  }
}

declare module '@mui/material/Checkbox' {
  interface CheckboxPropsColorOverrides {
    accent: true;
  }
}
declare module '@mui/material/Radio' {
  interface RadioPropsColorOverrides {
    accent: true;
  }
}

declare module '@mui/material/TextField' {
  interface TextFieldPropsColorOverrides {
    textColor: true;
  }
}

declare module '@mui/material/FormLabel' {
  interface FormLabelPropsColorOverrides {
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
