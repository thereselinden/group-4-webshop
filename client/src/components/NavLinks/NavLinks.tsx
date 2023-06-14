import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ICategory } from '../../interfaces/interfaces';

type Props = {
  navItems: ICategory[] | null;
};

const NavLinks = ({ navItems }: Props) => {
  return (
    <Box sx={{ display: { xs: 'none', md: 'block' }, ml: 3 }}>
      {navItems?.map(item => (
        <NavLink to={`/category/?category=${item._id}`} key={item.title}>
          <Button key={item.title} color="textColor">
            {item.title}
          </Button>
        </NavLink>
      ))}
    </Box>
  );
};

export default NavLinks;
