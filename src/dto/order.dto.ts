import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class Order {
  @ApiProperty({ example: 'C001', description: 'Order ID' })
  @IsString()
  id: string;

  @ApiProperty({ example: 150.0, description: 'Total order amount' })
  @IsNotEmpty()
  totalAmount: number;

  productIds: string[];
  // Additional properties for order details, customer information, etc.
}
