import { Injectable } from '@nestjs/common';
import { ShoppingCartItem } from './dto/shopping-cart-item.dto';
import { Order } from './dto/order.dto';
import { DbService } from './services/db/db.service';
import { PubsubService } from './services/pubsub/pubsub.service';

@Injectable()
export class AppService {
  constructor(
    private db: DbService,
    private pubsub: PubsubService,
  ) {}
  async createOrder(items: ShoppingCartItem[]): Promise<Order> {
    const cartProductIds = new Set(items.map((item) => item.productId)); // unique products in the cart
    // get product prices from the DB
    const productPrices = await this.db.getProductPrices([...cartProductIds]);

    const totalAmount = items.reduce(
      (item, acc) => productPrices[item.productId] * item.quantity + acc,
      0,
    );

    const order = new Order();
    order.productIds = [...cartProductIds];
    order.totalAmount = totalAmount;
    // fill other order details from the request

    // create the order in the DB
    const newOrder = await this.db.createOrder(order);

    // call publish handleOrder event
    this.pubsub.publish('orderCreated', order);

    // return the order details after we calculated and saved it to the DB
    return Promise.resolve(newOrder);
  }
}
