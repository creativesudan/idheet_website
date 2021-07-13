import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import UbuntuWoff2 from './fonts/Ubuntu-Regular.ttf';

const Ubuntu = {
  fontFamily: 'Ubuntu',
  fontStyle: 'Ubuntu',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Ubuntu'),
    local('Ubuntu-Regular'),
    url(${UbuntuWoff2}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
};

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Ubuntu, sans-serif',
    h2:{fontSize:32,fontWeight: 700,},
    h4:{fontSize:24,fontWeight: 500,},
    h5:{fontSize:20,fontWeight: 500,},
    h6:{fontSize:16,fontWeight: 500,},
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      textTransform:'none'
    },
  },
  palette: {
    primary: {
      main: '#28a745',
    },
    secondary: {
      main: '#ffc107',
    },
  },
});

ReactDOM.render(
  <>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
