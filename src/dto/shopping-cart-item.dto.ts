import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, IsPositive } from 'class-validator';

export class ShoppingCartItem {
  @ApiProperty({ example: 'P001', description: 'Product ID' })
  @IsString()
  productId: string;

  @ApiProperty({ example: 2, description: 'Quantity of the product' })
  @IsInt()
  @Min(1)
  @IsPositive()
  quantity: number;

}
