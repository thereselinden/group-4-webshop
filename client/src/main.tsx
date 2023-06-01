import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@emotion/react';

import App from './App.tsx';
import { theme } from './themes/themes.tsx';
import CartProvider from './context/CartContext.tsx';
import UserProvider from './context/UserContext.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  //<React.StrictMode>
  <UserProvider>
    <CartProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </CartProvider>
  </UserProvider>
  //</React.StrictMode>
);
