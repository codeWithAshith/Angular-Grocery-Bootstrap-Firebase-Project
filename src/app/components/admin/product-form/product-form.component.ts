import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnimationOptions } from 'ngx-lottie';

import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

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
  categories: string[];
  constructor(private productService: ProductService) {
    this.categories = productService.getCategories();
  }

  isValidImageUrl(): boolean {
    return new RegExp('(.*?).(jpg|png|jpeg)$').test(this.product.imageUrl);
  }

  async onSubmit(form: NgForm) {
    try {
      await this.productService.saveProduct(form.value);
      form.resetForm();
    } catch (error) {}
  }
}
