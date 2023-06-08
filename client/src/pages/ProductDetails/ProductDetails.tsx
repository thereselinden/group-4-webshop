import { useState } from 'react';
import { useParams } from 'react-router';

import Grid from '@mui/system/Unstable_Grid/Grid';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { IProduct } from '../../interfaces/interfaces';
import useFetch from '../../hooks/useFetch';
import { useCartContext } from '../../context/CartContext';
import { inventories } from '../../utils/Inventories';

const ProductDetails = () => {
  const [qty, setQty] = useState('1');
  const { id } = useParams();
  const { addToCart } = useCartContext();

  const [[product], [isLoading], [errorMessage]] = useFetch<IProduct>(
    `/api/products/${id}`
  );

  const handleChange = (event: SelectChangeEvent) => {
    setQty(event.target.value as string);
  };

  const handleAddToCart = () => {
    if (product) addToCart(product, parseInt(qty));
  };

  return (
    <>
      {errorMessage && <p>something went wrooooong</p>}
      {isLoading && <p>Laddar........</p>}
      {product && (
        <Box sx={{ flexGrow: 1 }}>
          <Grid container sx={{ pt: 3 }} spacing={1} columnSpacing={{ sm: 10 }}>
            <Grid xs={12} sm={6} component="div">
              <Box
                component="img"
                src={product.image}
                alt="productimg"
                sx={{ width: '100%' }}
              />
            </Grid>
            <Grid xs={12} sm={6} component="div">
              <Box sx={{ display: 'grid', gap: 2 }}>
                <Typography variant="h4" component="h1">
                  {product.title}
                </Typography>
                <Typography variant="body1" component="p">
                  {product.description}
                </Typography>
                <Typography variant="h5" component="p">
                  {product.price} kr
                </Typography>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl>
                    <InputLabel id="demo-simple-select-label">Antal</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={qty}
                      label="Antal"
                      onChange={handleChange}
                    >
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                      <MenuItem value={5}>5</MenuItem>
                      <MenuItem value={6}>6</MenuItem>
                      <MenuItem value={7}>7</MenuItem>
                      <MenuItem value={8}>8</MenuItem>
                      <MenuItem value={9}>9</MenuItem>
                      <MenuItem value={10}>10</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {inventories(product.inStock)}
                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  color="accent"
                  onClick={handleAddToCart}
                >
                  Lägg i Shoppingbag
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ProductDetails;
