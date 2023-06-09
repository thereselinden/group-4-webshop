import Grid from '@mui/material/Grid';

import useFetch from '../../hooks/useFetch';
import ProductCard from '../../components/ProductCard/ProductCard';
import { IProduct } from '../../interfaces/interfaces';
import { useProductContext } from '../../context/ProductContext';
import BackDropLoader from '../../components/BackDropLoader/BackDropLoader';

const ProductList = () => {
  const { products, isLoading } = useProductContext();

  return (
    <>
      {/* {errorMessage && <p>something went wrooooong</p>} */}
      {isLoading && <BackDropLoader loading={isLoading} />}
      {products && (
        <Grid container sx={{ pt: 3 }} spacing={1}>
          {products.map((product: IProduct) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              key={product._id}
              component="article"
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};

export default ProductList;
