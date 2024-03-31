import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ProductService } from 'src/application/service/product.service';
import { CreateProductDto, EditProductDto } from 'src/application/dto/product';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UserEntity } from 'src/domain/entities/user.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async listAllProducts(
    @Res() response: Response,
    @CurrentUser() loggedUser: UserEntity,
  ) {
    const productList = await this.productService.listAllProducts();

    return response.status(200).json(productList);
  }

  @Post()
  async createProduct(
    @Body() dto: CreateProductDto,
    @CurrentUser() loggedUser: UserEntity,
  ) {
    const { product, message } = await this.productService.createProduct(
      dto,
      loggedUser,
    );

    return [product, message];
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() dto: EditProductDto) {
    const { product, message } = await this.productService.updateProduct(
      id,
      dto,
    );

    return [product, message];
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const { message } = await this.productService.deleteProduct(id);

    return [message];
  }
}
