import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Product } from 'src/app/class/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Product[] = [];
  options: AnimationOptions = {
    path: '/assets/emptyCart.json',
  };

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getCart();
  }

  getCart() {
    this.cart = this.cartService
      .getCart()
      .filter((product) => product.count! > 0);
  }

  getCount(): number {
    return this.cartService.getCartCount();
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  removeFromCart(product: Product) {
    this.cartService.removeFromCart(product);
  }

  getProductCount(product: Product): number {
    return this.cartService.getProductCount(product);
  }

  getProductPrice(product: Product): number {
    return this.cartService.getProductPrice(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.getCart();
  }
}
