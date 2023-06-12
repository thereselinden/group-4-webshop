import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { ICategory, IProduct, IProductContext } from '../interfaces/interfaces';
import fetchData from '../utils/FetchData';

export const ProductContext = createContext<IProductContext>(null as any);

export const useProductContext = () => useContext(ProductContext);

const ProductProvider = ({ children }: PropsWithChildren) => {
  const [products, setProducts] = useState<IProduct[] | null>(null);
  const [categories, setCategories] = useState<ICategory[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [productModal, setProductModal] = useState<boolean>(false);
  console.log('in context productModal', productModal);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const products = await fetchData<IProduct[]>('/api/products');
      setProducts(products);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
    }
  };

  const getCategories = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const categories = await fetchData<ICategory[]>('/api/categories');
      setCategories(categories);
    } catch (error) {
      setErrorMessage((error as Error).message);
      setIsLoading(false);
    }
  };

  const getProduct = (id: string): IProduct | void => {
    const product = products?.find(prod => prod._id === id);
    if (product) return product;
    return;
  };

  const deleteProduct = async (id: string): Promise<void> => {
    const product = getProduct(id);
    const deletedProduct = { ...product, deleted: true };
    try {
      await fetchData(
        `/api/products/${id}`,
        'PUT',
        JSON.stringify(deletedProduct)
      );
      getProducts();
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const updateProduct = async (product: IProduct): Promise<void> => {
    console.log('inside update product context');
    try {
      await fetchData(
        `/api/products/${product._id}`,
        'PUT',
        JSON.stringify(product)
      );
      getProducts();
      setProductModal(false);
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  const addProduct = async (product: IProduct): Promise<void> => {
    console.log('inside add product context');
    try {
      await fetchData(`/api/products`, 'POST', JSON.stringify(product));
      getProducts();
      navigate('/profile/admin-products');
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        isLoading,
        productModal,
        setProductModal,
        getProduct,
        deleteProduct,
        updateProduct,
        addProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
