import { Route, Routes } from 'react-router';
import ProductList from '../../pages/ProductList/ProductList';
import { Box } from '@mui/system';
import { Toolbar } from '@mui/material';

type Props = {};

const MainContent = (props: Props) => {
  return (
    <Box component="main" sx={{ px: { sm: 3 }, pt: 3 }}>
      <Toolbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </Box>
  );
};

export default MainContent;
