import CartItemList from '../../components/CartItemList/CartItemList';
import Shipping from '../../components/Shipping/Shipping';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

type Props = {};

const CheckoutContainer = styled(Box)({
  display: 'grid',
  gridTemplateColumns: '3fr auto',
});

const Checkout = (props: Props) => {
  return (
    <CheckoutContainer>
      <Box>
        <Shipping />
        <Paper variant="outlined">
          <Typography variant="h4" component="h2">
            Dina uppgifter
          </Typography>
        </Paper>
      </Box>

      <CartItemList />
    </CheckoutContainer>
  );
};

export default Checkout;
