import { Route, Routes, NavLink } from 'react-router-dom';

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
import StoreIcon from '@mui/icons-material/Store';
import InventoryIcon from '@mui/icons-material/Inventory';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

import { useUserContext } from '../../context/UserContext';
import Overview from './OverView';
import MyOrders from './MyOrders';
import AllOrders from './AllOrders';
import AllProducts from './AllProducts';
import AddProduct from './AddProduct';

const UserProfile = () => {
  const { user, logout } = useUserContext();

  return (
    <>
      <Box
        component="section"
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: '250px auto' },
          padding: { xs: 1, sm: 0 },
          gap: 2,
        }}
      >
        <Paper
          variant="outlined"
          sx={{ height: 'fit-content' }}
          component="nav"
        >
          <List>
            <NavLink to="/profile/overview">
              <Typography
                variant="h5"
                component="h2"
                sx={{ textAlign: 'center', mb: 2 }}
              >
                Mina sidor
              </Typography>
            </NavLink>

            <NavLink to="/profile/my-orders">
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
                <NavLink to="/profile/admin-orders">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <StoreIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Alla ordrar'} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>

                <NavLink to="/profile/admin-products">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <InventoryIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Alla produkter'} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>

                <NavLink to="/profile/admin-all-products">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <AddBusinessIcon />
                      </ListItemIcon>
                      <ListItemText primary={'Lägg till produkt'} />
                    </ListItemButton>
                  </ListItem>
                </NavLink>
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
            <Route path="overview" element={<Overview />} />
            <Route path="my-orders" element={<MyOrders />} />
            <Route path="admin-orders" element={<AllOrders />} />
            <Route path="admin-products" element={<AllProducts />} />
            <Route path="admin-all-products" element={<AddProduct />} />
          </Routes>
        </Box>
      </Box>

      {/* <ProductModal productId={productId} setProductId={setProductId} /> */}
    </>
  );
};

export default UserProfile;
