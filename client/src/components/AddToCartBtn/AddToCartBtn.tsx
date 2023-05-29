import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

import { theme } from '../../themes/themes';

type Props = {};

const AddToCartBtn = (props: Props) => {
  return (
    <IconButton
      style={{
        backgroundColor: theme.palette.accent.background,
        color: theme.palette.accent.color,
      }}
      aria-label="add to shopping cart"
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default AddToCartBtn;
