import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/class/Product';
import { Order } from 'src/app/interface/Order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.orderService
      .getAllUserOrder(this.authService.getUser().id)
      .subscribe((response) => {
        this.orders = response.map((order) => {
          const orderValue = order.payload.exportVal();
          let total = 0;
          let orderDetails: string[] = [];
          for (const c in orderValue.cart) {
            total += orderValue.cart[c].count * orderValue.cart[c].price;
            orderDetails.push(
              `${orderValue.cart[c].title} x ${orderValue.cart[c].count}`
            );
          }
          return {
            id: order.key,
            total: total,
            orderDetails: orderDetails,
            ...orderValue,
          };
        });
        this.loading = false;
        console.log(this.orders);
      });
  }
}
