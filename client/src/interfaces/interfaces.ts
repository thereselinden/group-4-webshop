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
  clearCart: () => void;
  calcProductTotal: () => number;
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

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  __v?: number;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
}
export interface IUserContext {
  user: IUser | null;
  isLoading: boolean;
  errorMessage: string | null;
  userModal: boolean;
  registerSuccess: boolean;
  setUserModal: (arg0: boolean) => void;
  setRegisterSuccess: (arg0: boolean) => void;
  setErrorMessage: (arg0: null) => void;
  login: (credentials: ILoginForm) => Promise<void>;
  register: (credentials: IRegisterForm) => Promise<void>;
  logout: () => void;
}
export interface IShipping {
  _id: string;
  company: string;
  price: number;
  deliveryTimeInHours: number;
  __v?: number;
}

export interface IDeliveryAddress {
  street: string;
  zipcode: string;
  city: string;
  country: string;
}

export interface IOrderItem extends ICartItem {
  price: number;
}

export interface IConfirmedOrder {
  createdAt: string;
  customer: IUser;
  deliveryAddress: IDeliveryAddress;
  orderItems: IOrderItem[];
  orderNumber: string;
  shipped: boolean;
  shippingMethod: IShipping;
  updatedAt: string;
  __v: number;
  _id: string;
}
