import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { NavItem } from '../../interfaces/interfaces';

type Props = {
  navItems: NavItem[];
};

const NavLinks = ({ navItems }: Props) => {
  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      {navItems.map(item => (
        <Button key={item.name} sx={{ color: '#fff' }}>
          {item.name}
        </Button>
      ))}
    </Box>
  );
};

export default NavLinks;
