import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/class/Address';
import { Product } from 'src/app/class/Product';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
})
export class CheckOutComponent {
  cart: Product[];
  address = new Address();

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router
  ) {
    this.cart = cartService.getCart();
  }

  getCount(): number {
    return this.cartService.getCartCount();
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }

  getProductCount(product: Product): number {
    return this.cartService.getProductCount(product);
  }

  getProductPrice(product: Product): number {
    return this.cartService.getProductPrice(product);
  }

  async onSubmit(form: NgForm) {
    try {
      await this.checkoutService.placeOrder({
        ...form.value,
        cart: this.cartService.getCart(),
      });
      form.resetForm();
      this.cartService.clearCart();
      this.router.navigate(['/']);
    } catch (error) {}
  }
}
