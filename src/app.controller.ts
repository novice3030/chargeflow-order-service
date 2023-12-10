import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ShoppingCartItem } from './dto/shopping-cart-item.dto';
import { Order } from './dto/order.dto';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  createOrder(
    @Body() shoppingCartItems: ShoppingCartItem[],
  ): Observable<Order> {
    return this.appService.createOrder(shoppingCartItems);
  }
}
