import { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
//type Props = {};

const ProductList = () => {
  const {
    data: products,
    isLoading,
    errorMessage,
  } = useFetch('/api/productss');

  console.log(products, 'isLoading:', isLoading);
  return (
    <>
      {errorMessage && <p>something went wrooooong</p>}
      {isLoading && <p>Laddar........</p>}
      {products && products.map(product => <h1>{product.title}</h1>)}
    </>
  );
};

export default ProductList;
