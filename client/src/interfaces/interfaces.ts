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
