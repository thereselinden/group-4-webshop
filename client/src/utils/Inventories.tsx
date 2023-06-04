import Typography from '@mui/material/Typography';
import { red, yellow } from '@mui/material/colors';

const inventoryTextColor = (qty: number, color: string) => {
  const item = (
    <Typography color={color} variant="caption" display="block">
      {qty} i lager
    </Typography>
  );
  return item;
};

export const inventories = (inventory: number) => {
  switch (true) {
    case inventory < 5:
      return inventoryTextColor(inventory, red[500]);
    case inventory < 10:
      return inventoryTextColor(inventory, yellow[800]);
    case inventory > 10:
      return inventoryTextColor(inventory, 'textColor');
    default:
      'Varan finns i lager';
  }
};
