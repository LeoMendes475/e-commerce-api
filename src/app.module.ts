import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthController } from './presentation/controllers/auth.controller';
import { AuthService } from './application/service/auth.service';
import { CategoryController } from 'src/presentation/controllers/category.controller';
import { CategoryService } from 'src/application/service/category.service';
import { CategoryEntity } from './domain/entities/category.entity';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { OrderController } from './presentation/controllers/order.controller';
import { OrderEntity } from './domain/entities/order.entity';
import { OrderService } from './application/service/order.service';
import { PostgresConfigService } from './config/postgres.config.service';
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
    TypeOrmModule.forFeature([
      CategoryEntity,
      OrderEntity,
      ProductEntity,
      UserEntity,
    ]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [
    AuthController,
    CategoryController,
    OrderController,
    ProductController,
    UserController,
  ],
  providers: [
    AuthService,
    CategoryService,
    LocalStrategy,
    OrderService,
    ProductService,
    UserService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
