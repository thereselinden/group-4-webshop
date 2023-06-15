import { PropsWithChildren, createContext, useContext } from 'react';

import { ICartContext, IProduct, ICartItem } from '../interfaces/interfaces';

import { useLocalStorage } from '../utils/LocalStorage';

export const CartContext = createContext<ICartContext>(null as any);

export const useCartContext = () => useContext(CartContext);

const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useLocalStorage<ICartItem[]>('cart', []);

  const addToCart = (product: IProduct, quantity: number) => {
    const inCartIndex = cartItems.findIndex(
      item => product._id === item.product._id
    );

    if (inCartIndex !== -1) {
      const newItems = [...cartItems];
      newItems[inCartIndex].quantity += quantity;
      setCartItems(newItems);
    } else {
      const cartItem = { product, quantity };
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeFromCart = (id: string, qty = 1) => {
    const inCartIndex = cartItems.findIndex(item => id === item.product._id);

    if (inCartIndex !== -1) {
      const newItems = [...cartItems];
      if (newItems[inCartIndex].quantity === qty) {
        newItems.splice(inCartIndex, 1);
      } else {
        newItems[inCartIndex].quantity -= qty;
      }
      setCartItems(newItems);
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const calcProductTotal = (): number => {
    let sum = 0;
    cartItems.forEach(item => (sum += item.quantity * item.product.price));

    return sum;
  };

  const numOfProducts = (): number => {
    let prodqty = 0;
    cartItems.forEach(item => (prodqty += item.quantity));

    return prodqty;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        calcProductTotal,
        numOfProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
