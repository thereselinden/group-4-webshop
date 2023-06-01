import CartItemList from '../../components/CartItemList/CartItemList';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

import Typography from '@mui/material/Typography';
import Shipping from '../../components/Shipping/Shipping';

type Props = {};

const Checkout = (props: Props) => {
  return (
    <>
      <h1>Checkout</h1>

      <Box>
        <Box>
          <Shipping />
          <Paper variant="outlined">
            <Typography variant="h3">Dina uppgifter</Typography>
          </Paper>
        </Box>

        <CartItemList />
      </Box>
    </>
  );
};

export default Checkout;
