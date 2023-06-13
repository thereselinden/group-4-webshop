import { useSearchParams } from 'react-router-dom';
import { useProductContext } from '../../context/ProductContext';
import ProductList from '../../components/ProductList/ProductList';
import { ICategory } from '../../interfaces/interfaces';

type Props = {};

const Category = (props: Props) => {
  const { products, isLoading, getCategoryContext } = useProductContext();
  const [searchParams] = useSearchParams();

  const catId = searchParams.get('category');
  console.log('catid:', catId);

  let categoryDetails: ICategory | void;
  if (catId) categoryDetails = getCategoryContext(catId);

  let filteredProducts = products;

  if (catId && products) {
    filteredProducts = products.filter(product =>
      product?.categories?.some(category => category._id === catId)
    );
  }

  console.log('filtered:', filteredProducts);

  return (
    <>
      {catId && filteredProducts ? (
        <>
          <h1>{categoryDetails?.title}</h1>
          <p>{categoryDetails?.description}</p>
          <ProductList products={filteredProducts} />
        </>
      ) : (
        <p>ingen kategori vald</p>
      )}
    </>
  );
};

export default Category;
