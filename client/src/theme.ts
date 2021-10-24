import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    primary: {
      main: '#222831',
      dark: 'rgb(1,58,99)',
    },
    secondary: {
      main: '#3EDBF0',
      light: '#e3cef7',
      contrastText: 'rgb(0,48,73)',
    },
    background: {
      default: 'rgb(255,255,255)',
      paper: 'rgb(255,255,255)',
    },
    text: {
      primary: '#F4F9F9',
      secondary: 'rgb(1,58,99)',
    },
    error: {
      main: 'rgb(233,12,60)',
    },
    success: {
      main: 'rgb(255,77,109)',
    },
  },
  typography: {
    h3: {
      fontFamily: 'bodoni-urw',
      fontDisplay: 'optional',
    },
    h4: {
      fontFamily: 'bodoni-urw',
      fontDisplay: 'optional',
    },
    h5: {
      fontFamily: 'bodoni-urw',
      fontDisplay: 'optional',
    },
    fontFamily: 'Montserrat',
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 42,
          height: 26,
          padding: 0,
          margin: 8,
        },
        switchBase: {
          padding: 1,
          '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + $track': {
              opacity: 1,
              border: 'none',
            },
          },
        },
        thumb: {
          width: 24,
          height: 24,
        },
        track: {
          borderRadius: 13,
          border: '1px solid #bdbdbd',
          backgroundColor: '#fafafa',
          opacity: 1,
          transition:
            'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 5,
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: 5,
        },
      },
    },
  },
})

export default theme
