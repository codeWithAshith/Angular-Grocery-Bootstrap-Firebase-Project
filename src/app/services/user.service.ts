import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AuthUser } from '../interface/AuthUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  async saveUser(user: AuthUser) {
    try {
      await this.db.object('/users/' + user.id).update(user);
    } catch (error) {
      console.log('saveUser ' + error);
    }
  }
}
