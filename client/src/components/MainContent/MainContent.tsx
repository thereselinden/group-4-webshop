import { Route, Routes } from 'react-router';
import ProductList from '../../pages/ProductList/ProductList';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';
import ProductDetails from '../../pages/ProductDetails/ProductDetails';

type Props = {};

const MainContent = (props: Props) => {
  return (
    <Box
      component="main"
      sx={{ px: { sm: 3 }, pt: 3, maxWidth: 1200, margin: 'auto' }}
    >
      <Toolbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/:id" element={<ProductDetails />} />
      </Routes>
    </Box>
  );
};

export default MainContent;
