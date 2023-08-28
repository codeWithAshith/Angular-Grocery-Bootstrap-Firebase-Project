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
      await this.db.list('/orders').push(order);
    } catch (error) {
      console.log('placeOrder ' + error);
    }
  }
}
