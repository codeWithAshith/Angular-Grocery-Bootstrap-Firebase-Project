import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/interface/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  cart: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
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
}
