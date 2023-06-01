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
// import { ListItemIcon } from '@mui/material';

type Props = {};

const navItems = ['Mina köp', 'Logga ut'];
//const handleLogout =()=>{logout()};
const UserProfile = (props: Props) => {
  const { user, logout } = useUserContext();

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper variant="outlined">
          <List>
            <Typography variant="h5" component="p">
              Mina sidor
            </Typography>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <ShoppingBasketIcon />
                    ) : (
                      <LogoutIcon onClick={() => logout()} />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Paper>
        <Box component="div" sx={{ flexGrow: 1, p: 3 }}>
          <Typography variant="h4" component="h1">
            Hej {user?.firstName}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default UserProfile;
