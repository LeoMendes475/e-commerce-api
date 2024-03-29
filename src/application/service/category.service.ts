import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';

import { CategoryEntity } from 'src/domain/entities/category.entity';
import { CreateCategoryDto } from 'src/application/dto/product';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    const category = new CategoryEntity();

    category.id = uuid();
    category.name = dto.name;
    category.description = dto.description;
    category.createdAt = new Date();

    await this.categoryRepository.save(category);

    return {
      message: 'Category created successfully.',
      category,
    };
  }

  async getAllCategories() {
    const categoriesList = await this.categoryRepository.find();

    return categoriesList;
  }
}
