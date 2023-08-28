import { Injectable } from '@angular/core';
import { Product } from '../interface/Product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private authService: AuthService) {}

  private updateCart(products: Product[]) {
    localStorage.setItem('cart', JSON.stringify(products));
  }

  getCart(): Product[] | null {
    return (
      localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')!)
    );
  }

  getCartCount() {
    let cartProducts: Product[] = this.getCart() || [];
    if (cartProducts.length > 0) {
      return cartProducts.reduce((acc, curr) => {
        acc += curr.count!;
        return acc;
      }, 0);
    }
    return 0;
  }

  addToCart(product: Product) {
    let cartProducts: Product[] = this.getCart() || [];
    if (
      cartProducts &&
      cartProducts.find((pro: Product) => pro.id === product.id)
    ) {
      cartProducts = cartProducts.map((pro) => {
        if (pro.id === product.id) {
          return { ...pro, count: pro.count! + 1 };
        }
        return pro;
      });
      this.updateCart(cartProducts);
    } else {
      cartProducts.push({
        ...product,
        count: 1,
      });
      this.updateCart(cartProducts);
    }
  }

  removeFromCart(product: Product) {
    let cartProducts: Product[] = this.getCart() || [];
    cartProducts = cartProducts.map((pro) => {
      if (pro.id === product.id) {
        if (pro.count! > 0) return { ...pro, count: pro.count! - 1 };
      }
      return pro;
    });
    this.updateCart(cartProducts);
  }

  isInCart(product: Product): boolean {
    return this.getProductCount(product) > 0;
  }

  getProductCount(product: Product): number {
    let cartProducts: Product[] = this.getCart() || [];
    return cartProducts.find((pro) => pro.id === product.id)?.count || 0;
  }
}
