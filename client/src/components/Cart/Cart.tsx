import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { theme } from '../../themes/themes';

type Props = {};

const Cart = (props: Props) => {
  return (
    <IconButton
      aria-label="add to shopping cart"
      color="textColor"
      // style={{ color: theme.palette.textColor.light }}
    >
      <ShoppingCartIcon />
    </IconButton>
  );
};

export default Cart;
