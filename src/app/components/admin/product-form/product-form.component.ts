import { Component } from '@angular/core';

import { Product } from 'src/app/interface/Product';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class AdminProductFormComponent {
  product = new Product();
  categories;

  constructor(private categoryService: CategoryService) {
    this.categories = categoryService.getCategories();
  }

  onSubmit(form: any) {
    console.log(form.value);
  }
}
