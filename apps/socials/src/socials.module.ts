import { Module } from '@nestjs/common';
import { SocialsController } from './socials.controller';
import { SocialsService } from './socials.service';
import {
  DatabaseModule,
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
} from '@app/common';
import {
  AlbumEntity,
  CommentEntity,
  CommentLikeEntity,
  FriendEntity,
  PostEntity,
  PostImageEntity,
  PostLikeEntity,
  PostShareEntity,
  PostTagEntity,
  TagEntity,
} from './entities';
import * as Joi from 'joi';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule.forRoot({
      useTypeOrm: true,
      useMongoose: false,
    }),
    DatabaseModule.forFeature({
      typeormEntities: [
        AlbumEntity,
        CommentLikeEntity,
        CommentEntity,
        FriendEntity,
        PostImageEntity,
        PostLikeEntity,
        PostShareEntity,
        PostTagEntity,
        PostEntity,
        TagEntity,
      ],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/socials/.env',
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
  controllers: [SocialsController],
  providers: [
    SocialsService,
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
export class SocialsModule {}
