import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';

type Props = {};

const Cart = (props: Props) => {
  return (
    <IconButton aria-label="add to shopping cart">
      <ShoppingCartIcon sx={{ color: 'white' }} />
    </IconButton>
  );
};

export default Cart;
