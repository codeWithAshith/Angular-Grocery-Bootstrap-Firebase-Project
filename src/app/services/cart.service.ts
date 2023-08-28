import { Injectable } from '@angular/core';
import { Product } from '../class/Product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private updateCart(products: Product[]) {
    console.log(products);
    localStorage.setItem('cart', JSON.stringify(products));
  }

  getCart(): Product[] {
    return (
      localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart')!)
    );
  }

  getCartCount(): number {
    let cartProducts: Product[] = this.getCart() || [];
    if (cartProducts.length > 0) {
      return cartProducts.reduce((acc, curr) => {
        acc += curr.count!;
        return acc;
      }, 0);
    }
    return 0;
  }

  getCartTotal(): number {
    let cartProducts: Product[] = this.getCart() || [];
    if (cartProducts.length > 0) {
      return cartProducts.reduce((acc, curr) => {
        acc += curr.price! * curr.count! || 0;
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
        return { ...pro };
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

  getProductPrice(product: Product): number {
    let cartProducts: Product[] = this.getCart() || [];
    return cartProducts.find((pro) => pro.id === product.id)?.price || 0;
  }

  clearCart(): void {
    this.updateCart([]);
  }
}
