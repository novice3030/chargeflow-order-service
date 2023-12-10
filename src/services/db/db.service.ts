import { Injectable } from '@nestjs/common';
import { Order } from 'src/dto/order.dto';
import { uuid4 } from 'uuid';

@Injectable()
export class DbService {
  createOrder(order: Order) {
    order.id = uuid4();
    return Promise.resolve(order);
  }

  getProductPrices(productIds: string[]) {
    return Promise.resolve(
      productIds.map(() => {
        return {
          productId: uuid4(),
          price: Math.random() * 5000 + 1,
        };
      }),
    );
  }
}
