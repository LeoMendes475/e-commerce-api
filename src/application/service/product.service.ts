import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { ProductEntity } from 'src/domain/entities/product.entity';
import { CreateProductDto, EditProductDto } from 'src/application/dto/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    const product = new ProductEntity();

    product.id = uuid();
    product.name = dto.name;
    product.value = dto.value;
    product.quantityAvailable = dto.quantityAvailable;
    product.description = dto.description;
    product.categoryId = dto.categoryId;
    product.createdAt = new Date();

    await this.productRepository.save(product);

    return {
      message: 'Product created successfully.',
      product,
    };
  }

  async listAllProducts() {
    const productList = await this.productRepository.find();

    return {
      message: 'Product list successfully.',
      productList,
    };
  }

  async updateProduct(id: string, dto: EditProductDto) {
    const product = await this.productRepository.findOneBy({ id });

    if (product === null) {
      throw new NotFoundException('The product was not found');
    }

    Object.assign(product, dto as EditProductDto);

    await this.productRepository.save(product);

    return {
      message: 'Product updated successfully.',
      product,
    };
  }

  async deleteProduct(id: string) {
    const productEntity = await this.productRepository.findOneBy({ id });

    if (productEntity === null) {
      throw new NotFoundException('The product was not found');
    }

    await this.productRepository.delete(productEntity.id);

    return {
      message: 'Product deleted successfully.',
    };
  }
}
