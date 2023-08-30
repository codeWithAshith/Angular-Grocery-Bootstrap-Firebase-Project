import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private db: AngularFireDatabase) {}

  getAllUserOrder(userId: string) {
    return this.db
      .list('/orders', (ref) => {
        return ref.orderByChild('userId').equalTo(userId);
      })
      .snapshotChanges();
  }
}
