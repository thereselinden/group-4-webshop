import Typography from '@mui/material/Typography';

import Hero from '../../components/Hero/Hero';
import ProductList from '../../components/ProductList/ProductList';
import { useProductContext } from '../../context/ProductContext';

type Props = {};

const Home = (props: Props) => {
  const { products } = useProductContext();
  return (
    <>
      <Hero />
      <Typography variant="h4" component="h2" sx={{ mt: 3 }}>
        Alla produkter
      </Typography>
      {products && <ProductList products={products} />}
    </>
  );
};

export default Home;
