import { Injectable } from '@angular/core';
import { Product } from '../interface/Product';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private categories: string[] = [
    'Bread',
    'Dairy',
    'Fruits',
    'Vegetables',
    'Spices',
  ];

  constructor(private db: AngularFireDatabase) {}

  getCategories() {
    return this.categories;
  }

  async saveProduct(product: Product): Promise<boolean> {
    try {
      await this.db.list('/products').push(product);
      return Promise.resolve(true);
    } catch (error) {
      console.log('saveProduct ' + error);
      return Promise.reject(false);
    }
  }

  getProducts() {
    return this.db.list('/products').snapshotChanges();
  }

  delete(id: string): void {
    this.db.object('/products/' + id).remove();
  }
}
