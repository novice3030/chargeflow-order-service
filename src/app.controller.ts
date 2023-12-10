import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ShoppingCartItem } from './dto/shopping-cart-item.dto';
import { Order } from './dto/order.dto';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiBody({
    type: [ShoppingCartItem],
    description: 'Array of shopping cart items',
  })
  @ApiResponse({
    status: 201,
    description: 'Order successfully created',
    type: Order,
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  @Post()
  createOrder(@Body() shoppingCartItems: ShoppingCartItem[]): Promise<Order> {
    return this.appService.createOrder(shoppingCartItems);
  }
}
