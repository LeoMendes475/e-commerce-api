import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { CategoryService } from 'src/application/service/category.service';
import { CreateCategoryDto } from 'src/application/dto/product';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async categoryAllList(@Res() response: Response): Promise<any> {
    const categoriesList = await this.categoryService.getAllCategories();

    return response.status(200).json(categoriesList);
  }

  @Post()
  async createCategory(
    @Body() dto: CreateCategoryDto,
    @Res() response: Response,
  ): Promise<any> {
    const { category, message } =
      await this.categoryService.createCategory(dto);

    if (!category) return response.status(500).json(['Server error!']);

    return response.status(200).json([category, message]);
  }
}
