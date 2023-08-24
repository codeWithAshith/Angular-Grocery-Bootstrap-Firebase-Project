import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

import { Product } from 'src/app/interface/Product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class AdminProductFormComponent {
  options: AnimationOptions = {
    path: '/assets/default_product.json',
  };
  product = new Product();
  categories;

  constructor(private categoryService: CategoryService) {
    this.categories = categoryService.getCategories();
  }

  isValidImageUrl(): boolean {
    return new RegExp('(.*?).(jpg|png|jpeg)$').test(this.product.imageUrl);
  }

  onSubmit(form: any) {
    console.log(form.value);
  }
}
