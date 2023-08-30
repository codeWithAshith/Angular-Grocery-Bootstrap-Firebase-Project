import { Injectable } from '@angular/core';
import { Order } from '../interface/Order';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  constructor(private db: AngularFireDatabase) {}

  async placeOrder(order: Order) {
    try {
      let total = 0;
      let orderDetails: string[] = [];
      for (const c in order.cart) {
        total += order?.cart[c]?.count! * order.cart[c].price;
        orderDetails.push(`${order.cart[c].title} x ${order.cart[c].count}`);
      }
      order.total = total;
      order.orderDetails = orderDetails;
      await this.db.list('/orders').push(order);
    } catch (error) {
      console.log('placeOrder ' + error);
    }
  }
}
