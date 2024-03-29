import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { PostgresConfigService } from './config/postgres.config.service';

import { CategoryController } from 'src/presentation/controllers/category.controller';
import { CategoryService } from 'src/application/service/category.service';
import { CategoryEntity } from './domain/entities/category.entity';
import { ProductController } from 'src/presentation/controllers/product.controller';
import { ProductService } from 'src/application/service/product.service';
import { ProductEntity } from './domain/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([ProductEntity, CategoryEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ], // Imports in general
  controllers: [ProductController, CategoryController], // Controllers
  providers: [ProductService, CategoryService], // Service
})
export class AppModule {}
