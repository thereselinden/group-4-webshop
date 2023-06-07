import { Route, Routes } from 'react-router';
import ProductList from '../../pages/ProductList/ProductList';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import ProductDetails from '../../pages/ProductDetails/ProductDetails';
import UserProfile from '../../pages/UserProfile/UserProfile';
import ProtectedRoute from '../../utils/ProtectedRoute';
import Checkout from '../../pages/Checkout/Checkout';

type Props = {};

const MainContent = (props: Props) => {
  return (
    <Box
      component="main"
      sx={{
        px: { sm: 3 },
        py: 3,
        maxWidth: 1200,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
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
