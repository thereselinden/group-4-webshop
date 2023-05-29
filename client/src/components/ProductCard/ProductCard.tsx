import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { IProduct } from '../../interfaces/interfaces';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import { Box } from '@mui/system';
type Props = { product: IProduct };

const ProductCard = ({ product }: Props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component={'img'}
        sx={{ height: 240 }}
        image={product.image}
        title={product.title}
      />
      {/* <CardContent> */}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" component="div">
          {product.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}> */}
          <Typography variant="body2" color="text.secondary">
            {product.price} Kr
          </Typography>
          <AddToCartBtn />
          {/* </CardActions> */}
        </Box>
      </Box>
      {/* </CardContent> */}
    </Card>
  );
};

export default ProductCard;
