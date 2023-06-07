import { useState } from 'react';
import { useUserContext } from '../../context/UserContext';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import LogoutIcon from '@mui/icons-material/Logout';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Typography from '@mui/material/Typography';
import ListItemIcon from '@mui/material/ListItemIcon';
import { IConfirmedOrder } from '../../interfaces/interfaces';
import { Route, Routes, Link } from 'react-router-dom';
import OverView from './OverView';
import MyOrders from './MyOrders';
// import { ListItemIcon } from '@mui/material';

type Props = {};

const navItems = ['Mina köp', 'Logga ut'];

// ordrar produkter

//const handleLogout =()=>{logout()};
const UserProfile = (props: Props) => {
  const { user, logout } = useUserContext();
  const [orders, setOrders] = useState<IConfirmedOrder[]>(null);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper variant="outlined">
          <List>
            <Typography variant="h5" component="p">
              Mina sidor
            </Typography>
            <Link to="profile/my-orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Mina köp'} />
                </ListItemButton>
              </ListItem>
            </Link>
            {user?.isAdmin && (
              <>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Alla ordrar'} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <ShoppingBasketIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Alla produkter'} />
                  </ListItemButton>
                </ListItem>
              </>
            )}

            <ListItem disablePadding onClick={() => logout()}>
              <ListItemButton>
                <ListItemIcon>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary={'Logga ut'} />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>

        <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
          <Routes>
            <Route path="/profile/overview" element={<OverView />} />
            <Route path="/profile/my-orders" element={<MyOrders />} />
            <Route path="/profile/admin-orders" element={<OverView />} />
            <Route path="/profile/admin-products" element={<OverView />} />
          </Routes>
          {/* <Typography variant="h4" component="h1">
            Hej {user?.firstName}
          </Typography> */}
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
