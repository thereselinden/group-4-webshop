import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import CartItemList from '../CartItemList/CartItemList';
import Button from '@mui/material/Button';

import { useCartContext } from '../../context/CartContext';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (drawerOpen: boolean) => void;
};
const CartDrawer = ({ drawerOpen, setDrawerOpen }: Props) => {
  const { cartItems, calcProductTotal } = useCartContext();
  const navigate = useNavigate();

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setDrawerOpen(!drawerOpen);
    };

  const handleCheckout = () => {
    navigate('/checkout');
    setDrawerOpen(false);
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer()}>
      <Box
        sx={{ width: 350, p: 1 }}
        role="presentation"
        onKeyDown={toggleDrawer()}
      >
        <List
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">Din varukorg</Typography>
          <IconButton color="textColor" onClick={toggleDrawer()}>
            <CloseIcon />
          </IconButton>
        </List>
        <Divider />
        <List>
          <>
            {cartItems.length < 1 ? (
              <Typography>Varukorgen är tom</Typography>
            ) : (
              <>
                <CartItemList />
                <List>
                  <ListItem
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <Typography variant="h6">Summa</Typography>
                    <Typography variant="h6">
                      {calcProductTotal()} SEK
                    </Typography>
                  </ListItem>
                </List>
              </>
            )}
          </>
        </List>
        <Divider />

        <Button
          onClick={handleCheckout}
          disabled={cartItems.length < 1}
          fullWidth
          variant="contained"
          style={{
            marginBottom: '1rem',
          }}
          color="accent"
        >
          Gå till kassan
        </Button>
        <Button variant="contained" fullWidth onClick={toggleDrawer()}>
          Fortsätt handla
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
