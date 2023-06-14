import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import NavLinks from '../NavLinks/NavLinks';
import Cart from '../Cart/Cart';
import ProfileButton from '../ProfileButton/ProfileButton';
import { useProductContext } from '../../context/ProductContext';
import Search from '../Search/Search';

const drawerWidth = 240;

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { categories } = useProductContext();

  const navItems = categories;

  const handleDrawerToggle = () => {
    setMobileOpen(prevState => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Webbshop
      </Typography>
      <Divider />
      <List>
        {navItems?.map(item => (
          <NavLink to={`/category/?category=${item._id}`} key={item.title}>
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.title} color="textColor" />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }} component="header">
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            width: '100%',
            maxWidth: '1200px',
            margin: 'auto',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ display: 'flex' }}>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'block' } }}
              >
                <Link to="/">Webbshop</Link>
              </Typography>
            </Box>
            <NavLinks navItems={navItems} />
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Search />
            <ProfileButton />
            <Cart />
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
};

export default Header;
