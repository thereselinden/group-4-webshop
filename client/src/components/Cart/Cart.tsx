import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useCartContext } from '../../context/CartContext';

type Props = {};

const Cart = (props: Props) => {
  const { cartItems } = useCartContext();

  let count = 0;

  cartItems.forEach(item => {
    count += item.quantity;
  });

  return (
    <IconButton aria-label="add to shopping cart" color="textColor">
      <ShoppingCartIcon />
      <p>{count}</p>
    </IconButton>
  );
};

export default Cart;
