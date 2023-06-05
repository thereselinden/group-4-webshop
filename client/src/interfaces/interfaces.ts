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
  company: string;
  price: number;
  deliveryTimeInHours: number;
}

// export interface IOrder {
//   orderNumber: number,
//   customer: IUser,
//   deliveryAddress: {
//     street: string,
//     zip: number,
//     city: string,
//     country: string,
//   }
//   orderItems: {
//     item: ICartItem,
//     price: number
//   }
// }
// export interface IOrderContext {
//   orders: IOrder[]
// }
