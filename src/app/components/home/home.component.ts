import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  selectedCategory: string = 'All';
  categories: string[];
  originalProducts: Product[] = [];
  products: Product[] = [];
  loading: boolean = false;

  options: AnimationOptions = {
    path: '/assets/empty.json',
  };

  constructor(private productService: ProductService) {
    this.categories = productService.getCategories();
  }

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe((response) => {
      this.originalProducts = response.map((product) => {
        return { id: product.key, ...product.payload.exportVal() };
      });
      this.products = this.originalProducts;
      this.loading = false;
    });
  }

  setSlectedCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'All') this.products = this.originalProducts;
    else
      this.products = this.originalProducts.filter(
        (product) => product.category === category
      );
  }
}
