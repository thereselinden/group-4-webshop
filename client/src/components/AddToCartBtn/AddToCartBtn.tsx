import { MouseEvent } from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
};

const AddToCartBtn = ({ onClick, disabled }: Props) => {
  return (
    <IconButton
      color="accent"
      aria-label="add to shopping cart"
      onClick={e => onClick(e)}
      disabled={disabled}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default AddToCartBtn;
