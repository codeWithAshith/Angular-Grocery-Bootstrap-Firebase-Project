import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interface/Order';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './orders.component.html',
})
export class AdminOrdersComponent implements OnInit {
  orders: Order[] = [];
  loading: boolean = false;

  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.orderService.getAllOrder().subscribe((response) => {
      this.orders = response.map((order) => {
        const orderValue = order.payload.exportVal();
        let orderDetails: string[] = [];
        for (const c in orderValue.orderDetails) {
          orderDetails.push(orderValue.orderDetails[c]);
        }
        orderValue.orderDetails = orderDetails;
        return {
          id: order.key,
          ...orderValue,
        };
      });
      this.loading = false;
    });
  }

  changeStatus(status: string, order: Order) {
    this.orderService.updateOrder({ ...order, status: status });
  }
}
