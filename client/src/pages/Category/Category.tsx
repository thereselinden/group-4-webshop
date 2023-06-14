import { useSearchParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import ProductList from '../../components/ProductList/ProductList';
import { ICategory } from '../../interfaces/interfaces';
import Typography from '@mui/material/Typography';

const Category = () => {
  const { products, isLoading, getCategoryContext } = useProductContext();
  const [searchParams] = useSearchParams();

  const catId = searchParams.get('category');

  let categoryDetails: ICategory | void;
  if (catId) categoryDetails = getCategoryContext(catId);

  let filteredProducts = products;

  if (catId && products) {
    filteredProducts = products.filter(product =>
      product?.categories?.some(category => category._id === catId)
    );
  }

  return (
    <>
      {catId && filteredProducts ? (
        <>
          <Typography variant="h4" component="h1">
            {categoryDetails?.title}
          </Typography>
          <Typography>{categoryDetails?.description}</Typography>
          <ProductList products={filteredProducts} />
        </>
      ) : (
        <Typography>Ingen kategori vald</Typography>
      )}
    </>
  );
};

export default Category;
