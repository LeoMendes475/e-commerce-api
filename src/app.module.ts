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
import { UserEntity } from './domain/entities/user.entity';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/service/user.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    TypeOrmModule.forFeature([CategoryEntity, ProductEntity, UserEntity]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ], // Imports in general
  controllers: [CategoryController, ProductController, UserController], // Controllers
  providers: [CategoryService, ProductService, UserService], // Service
})
export class AppModule {}
