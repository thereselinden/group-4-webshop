import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';

import { useCartContext } from '../../context/CartContext';
import { theme } from '../../themes/themes';

type Props = {
  drawerOpen: boolean;
  setDrawerOpen: (drawerOpen: boolean) => void;
};

const CartDrawer = ({ drawerOpen, setDrawerOpen }: Props) => {
  const { cartItems, calcTotal, addToCart, removeFromCart } = useCartContext();

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
                {cartItems.map(item => (
                  <ListItem
                    sx={{
                      display: 'grid',
                      justifyContent: 'space-between',
                      gridTemplateColumns: '1fr 2fr auto',
                      gap: 1,
                    }}
                    key={item.product._id}
                  >
                    <Box
                      component="img"
                      src={item.product.image}
                      alt={item.product.title}
                      sx={{ width: 75 }}
                    />
                    <Box>
                      <Typography
                        variant="subtitle2"
                        component="p"
                        style={{ marginLeft: 8, fontWeight: 700 }}
                      >
                        {item.product.title}
                      </Typography>
                      <Typography style={{ marginLeft: 8 }}>
                        {item.product.price} kr
                      </Typography>
                      <Typography>
                        <IconButton
                          onClick={() => removeFromCart(item.product._id)}
                        >
                          <RemoveIcon sx={{ fontSize: 15 }} />
                        </IconButton>

                        {item.quantity}
                        <IconButton onClick={() => addToCart(item.product, 1)}>
                          <AddIcon sx={{ fontSize: 15 }} />
                        </IconButton>
                      </Typography>
                    </Box>
                    <Box>
                      <IconButton
                        onClick={() =>
                          removeFromCart(item.product._id, item.quantity)
                        }
                      >
                        <DeleteOutlineIcon />
                      </IconButton>
                    </Box>
                  </ListItem>
                ))}
              </>
            )}
          </>
        </List>
        <Divider />
        <List>
          <ListItem sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">Totalsumma</Typography>
            <Typography variant="h6">{calcTotal()} SEK</Typography>
          </ListItem>
        </List>
        <Button
          fullWidth
          variant="contained"
          style={{
            backgroundColor: theme.palette.accent.background,
            color: theme.palette.accent.color,
            marginBottom: '1rem',
          }}
        >
          Gå till kassan
        </Button>
        <Button variant="contained" fullWidth>
          Fortsätt handla
        </Button>
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
