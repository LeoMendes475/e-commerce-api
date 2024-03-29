import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsNumber()
  quantityAvailable: number;

  @IsString()
  description: string;

  @IsString()
  categoryId: string;
}

export class EditProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  value: number;

  @IsNumber()
  quantity_available: number;

  @IsString()
  description: string;

  @IsString()
  categoryId: string;
}
