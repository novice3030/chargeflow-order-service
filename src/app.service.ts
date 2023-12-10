import { Injectable } from '@nestjs/common';
import { ShoppingCartItem } from './dto/shopping-cart-item.dto';
import { Order } from './dto/order.dto';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  createOrder(items: ShoppingCartItem[]): Observable<Order> {
    const cartProductIds = new Set(items.map((item) => item.productId)); // unique products in the cart
    // get product prices from the DB
    const productPrices =
      await this.productService.getProductPrices(cartProductIds);

    const totalAmount = productPrices
      .map((productPrice) => productPrice.price)
      .reduce((price, acc) => price + acc, 0);

    const order = new Order();
    order.productIds = [...cartProductIds];
    order.totalAmount = totalAmount;
    // fill other order details from the request

    // create the order in the DB
    const newOrder = await this.db.createOrder(order);

    // call publish handleOrder event
    this.pubsub.publish('handleOrder', order);

    // return the order details after we calculated and saved it to the DB
    return of(newOrder);
  }
}
