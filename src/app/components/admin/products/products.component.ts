import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/interface/Product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'admin-products',
  templateUrl: './products.component.html',
})
export class AdminProductsComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe((response) => {
      this.products = response.map((product) => {
        return { id: product.key, ...product.payload.exportVal() };
      });
      this.loading = false;
    });
  }

  delete(id: string): void {
    if (!confirm('Are you sure you want to delete this product?')) return;
    this.productService.delete(id);
  }
}
