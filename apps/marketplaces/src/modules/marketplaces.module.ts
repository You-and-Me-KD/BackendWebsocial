import { Module } from '@nestjs/common';
import { MarketplacesService } from '../services/marketplaces.service';
import {
  AUTH_SERVICE,
  DatabaseModule,
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
} from '@app/common';
import {
  CategoryEntity,
  NftEntity,
  OrderEntity,
  OrderItemEntity,
  ProductEntity,
  ProductLikeEntity,
  ProductReviewEntity,
  TransactionEntity,
} from '../entities';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { CategoryController, MarketplacesController } from '../controllers';
import { CategoryService } from '../services/category.services';
import { CategoryRepository } from '../repositories';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    DatabaseModule.forRoot({ useTypeOrm: true, useMongoose: false }),
    DatabaseModule.forFeature({
      typeormEntities: [
        CategoryEntity,
        NftEntity,
        OrderItemEntity,
        OrderEntity,
        ProductLikeEntity,
        ProductReviewEntity,
        ProductEntity,
        TransactionEntity,
      ],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/marketplaces/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
        PORT: Joi.number().required(),
        API_PREFIX: Joi.string().default('api'),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get('AUTH_HOST'),
            port: configService.get('AUTH_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MarketplacesController, CategoryController],
  providers: [
    MarketplacesService,
    CategoryService,
    CategoryRepository,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class MarketplaceModule {}
