import ProductList from '../../components/ProductList/ProductList';
import { useProductContext } from '../../context/ProductContext';

type Props = {};

const Home = (props: Props) => {
  const { products } = useProductContext();
  return <>{products && <ProductList products={products} />}</>;
};

export default Home;
