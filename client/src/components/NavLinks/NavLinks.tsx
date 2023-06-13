import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { ICategory, NavItem } from '../../interfaces/interfaces';

type Props = {
  //navItems: NavItem[];
  navItems: ICategory[] | null;
};

const NavLinks = ({ navItems }: Props) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' }, ml: 3 }}>
      {navItems?.map(item => (
        <Button key={item.title} color="textColor">
          {item.title}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
