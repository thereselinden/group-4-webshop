import { MouseEvent } from 'react';

import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

import { theme } from '../../themes/themes';

type Props = {
  onClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const AddToCartBtn = ({ onClick }: Props) => {
  return (
    <IconButton
      style={{
        backgroundColor: theme.palette.accent.background,
        color: theme.palette.accent.color,
      }}
      aria-label="add to shopping cart"
      onClick={e => onClick(e)}
    >
      <AddShoppingCartIcon />
    </IconButton>
  );
};

export default AddToCartBtn;
