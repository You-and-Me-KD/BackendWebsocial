import { Module } from '@nestjs/common';
import { MarketplacesController } from './marketplaces.controller';
import { MarketplacesService } from './marketplaces.service';
import {
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
} from './entities';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

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
  ],
  controllers: [MarketplacesController],
  providers: [
    MarketplacesService,
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
