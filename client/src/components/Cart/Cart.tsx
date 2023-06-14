import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';

import Badge from '@mui/material/Badge';

import { useCartContext } from '../../context/CartContext';
import CartDrawer from '../CartDrawer/CartDrawer';

const Cart = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { numOfProducts } = useCartContext();

  return (
    <>
      <IconButton
        aria-label="add to shopping cart"
        color="textColor"
        onClick={() => setDrawerOpen(true)}
      >
        <Badge badgeContent={numOfProducts()} color="accent">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
      <CartDrawer drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
};

export default Cart;
