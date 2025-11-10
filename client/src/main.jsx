import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import theme from './theme.js';


// import './index.css';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// const theme = createTheme({});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
  <AuthProvider>
      <App />

            </AuthProvider>
                  </ThemeProvider>

               </BrowserRouter>
  </React.StrictMode>

);