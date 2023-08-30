import { Product } from '../class/Product';

export interface Order {
  id: string;
  name: string;
  address: string;
  city: string;
  pincode: number;
  userId: string;
  status?: string;
  total?: number;
  cart: Product[];
  date: string;
  orderDetails: string[];
}
