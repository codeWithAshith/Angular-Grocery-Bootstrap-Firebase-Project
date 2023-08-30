import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Order } from '../interface/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private db: AngularFireDatabase) {}

  getAllOrder() {
    return this.db.list('/orders').snapshotChanges();
  }

  getAllUserOrder(userId: string) {
    return this.db
      .list('/orders', (ref) => {
        return ref.orderByChild('userId').equalTo(userId);
      })
      .snapshotChanges();
  }

  updateOrder(order: Order) {
    this.db.object('/orders/' + order.id).update(order);
  }
}
