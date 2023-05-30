import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { IProduct } from '../../interfaces/interfaces';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import { Box } from '@mui/system';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';
import { useCartContext } from '../../context/CartContext';
import { MouseEvent } from 'react';

type Props = { product: IProduct };

const ProductCard = ({ product }: Props) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    addToCart(product, 1);
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={product._id}>
        <CardMedia
          component={'img'}
          sx={{ height: 240 }}
          image={product.image}
          title={product.title}
        />
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" component="h3">
            {product.title}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 1,
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {product.price} kr
            </Typography>
            <AddToCartBtn onClick={handleAddToCart} />
          </Box>
        </Box>
      </Link>
    </Card>
  );
};

export default ProductCard;
