import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Product } from 'src/app/class/Product';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
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

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private cartService: CartService
  ) {
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
    if (category === 'All') this.products = this.originalProducts;
    else
      this.products = this.originalProducts.filter(
        (product) => product.category === category
      );
    this.selectedCategory = category;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  isInCart(product: Product): boolean {
    return this.cartService.isInCart(product);
  }

  getProductCount(product: Product): number {
    return this.cartService.getProductCount(product);
  }
}
