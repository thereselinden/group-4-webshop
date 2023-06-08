import { Route, Routes, Link, NavLink } from 'react-router-dom';

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

import { useUserContext } from '../../context/UserContext';
import Overview from './OverView';
import MyOrders from './MyOrders';

type Props = {};

const UserProfile = (props: Props) => {
  const { user, logout } = useUserContext();

  return (
    <>
      <Box sx={{ display: 'grid', gridTemplateColumns: '250px auto', gap: 2 }}>
        <Paper variant="outlined" sx={{ height: 'fit-content' }}>
          <List>
            <Typography
              variant="h5"
              component="h1"
              sx={{ textAlign: 'center', mb: 2 }}
            >
              Mina sidor
            </Typography>
            <NavLink to="profile/my-orders">
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingBasketIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Mina köp'} />
                </ListItemButton>
              </ListItem>
            </NavLink>
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

        <Box component="div" sx={{ flexGrow: 1 }}>
          <Routes>
            <Route path="/overview" element={<Overview />} />
            <Route path="profile/my-orders" element={<MyOrders />} />
            <Route path="/profile/admin-orders" element={<Overview />} />
            <Route path="/profile/admin-products" element={<Overview />} />
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
