import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categories: string[] = [
    'Bread',
    'Dairy',
    'Fruits',
    'Vegetables',
    'Spices',
  ];

  constructor() {}

  getCategories() {
    return this.categories;
  }
}
