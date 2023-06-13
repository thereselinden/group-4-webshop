import { Route, Routes } from 'react-router';

import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';

import ProductList from '../../pages/ProductList/ProductList';
import ProductDetails from '../../pages/ProductDetails/ProductDetails';
import UserProfile from '../../pages/UserProfile/UserProfile';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Checkout from '../../pages/Checkout/Checkout';

const MainContent = () => {
  return (
    <Box
      component="main"
      sx={{
        px: { xs: 3 },
        py: 3,
        maxWidth: 1200,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '80vh',
      }}
    >
      <Toolbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id" element={<ProductDetails />} />
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Box>
  );
};

export default MainContent;
