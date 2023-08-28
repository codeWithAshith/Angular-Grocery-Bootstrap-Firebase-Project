import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';

import { Product } from 'src/app/class/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
})
export class AdminProductFormComponent {
  id;
  product = new Product();
  categories: string[];
  options: AnimationOptions = {
    path: '/assets/default_product.json',
  };
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categories = productService.getCategories();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id)
      productService.getProductById(this.id).subscribe((response) => {
        this.product.id = this.id!;
        this.product = response as Product;
      });
  }

  isValidImageUrl(): boolean {
    return new RegExp('(.*?).(jpg|png|jpeg)$').test(this.product.imageUrl);
  }

  async onSubmit(form: NgForm) {
    try {
      if (this.id) {
        this.productService.updateProduct(this.id, form.value);
        this.router.navigate(['/admin/products']);
      }
      await this.productService.saveProduct(form.value);
      form.resetForm();
    } catch (error) {}
  }
}
