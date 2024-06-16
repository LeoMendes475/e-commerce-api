import { Type } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { OrderEntity } from 'src/domain/entities/order.entity';

export class CreateOrderDto extends OrderEntity {
  @IsString()
  buyerName: string;

  @IsString()
  buyerPassport: string;

  @IsString()
  buyerOrganization: string;

  @IsString()
  productId: string;

  @Type(() => Number)
  @IsNumber()
  orderQuantity: number;

  @Type(() => Date)
  @IsDate()
  sellDate: Date;
}
