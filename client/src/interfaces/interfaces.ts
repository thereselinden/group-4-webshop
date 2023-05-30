export interface NavItem {
  name: string;
  to: string;
}

export interface IProduct {
  categories: string[];
  deleted: boolean;
  description: string;
  image: string;
  inStock: number;
  price: number;
  title: string;
  _id: string;
}

export interface ICartItem {
  quantity: number;
  product: IProduct;
}
export interface ICartContext {
  cartItems: ICartItem[];
  addToCart: (product: IProduct, quantity: number) => void;
  removeFromCart: (id: string, qty?: number) => void;
  calcTotal: () => number;
  numOfProducts: () => number;
}

export interface ILoginForm {
  email: string;
  password: string;
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
