import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { ICartContext, IProduct, ICartItem } from '../interfaces/interfaces';

export const CartContext = createContext<ICartContext>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

// Provider
const CartProvider = ({ children }: PropsWithChildren) => {
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);

  console.log('cartItems', cartItems);

  //funktion som tar in en product i string
  const addToCart = (product: IProduct, quantity: number) => {
    // Kolla om produkten finns i varukorg
    // -1 = finns inte eller index nummer
    const inCartIndex = cartItems.findIndex(
      item => product._id === item.product._id
    );

    if (inCartIndex !== -1) {
      console.log('inside if');
      const newItems = [...cartItems];
      newItems[inCartIndex].quantity += quantity;
      setCartItems(newItems);
    } else {
      const cartItem = { product, quantity };
      setCartItems([...cartItems, cartItem]);
    }
  };

  const removeFromCart = () => {};

  // Om den finns uppdatera qty

  // Om den inte finns, lägg till hela objektet (produkt)

  //Expoerterar ut contextens provider
  //emmellan Contexten lägger vi (props.)children
  //Proivdea med value ut det vi vill göra synligt. Value måste matcha Interface. Eftersom vi typat upp context så. Därför value propen. {{}} pga gör det som ett objekt
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

//Children i mitten - > se App.tsx

export default CartProvider;