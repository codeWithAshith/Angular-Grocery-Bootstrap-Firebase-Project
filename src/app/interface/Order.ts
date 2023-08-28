import { Product } from '../class/Product';

export interface Order {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: number;
  cart: Product[];
}
