import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
} from '@angular/fire/compat/database';
import { AppUser } from '../interface/appUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private db: AngularFireDatabase) {}

  async saveUser(user: AppUser) {
    try {
      await this.db.object('/users/' + user.id).update(user);
    } catch (error) {
      console.log('saveUser ' + error);
    }
  }
}
