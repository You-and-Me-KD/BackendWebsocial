import { Module } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import {
  DatabaseModule,
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
} from '@app/common';
import { FileEntity } from './entities/file.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FilesRepository } from './files.repository';

@Module({
  imports: [
    DatabaseModule.forRoot({
      useTypeOrm: true,
      useMongoose: false,
    }),
    DatabaseModule.forFeature({
      typeormEntities: [FileEntity],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/files/.env',
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
  controllers: [FilesController],
  providers: [
    FilesService,
    FilesRepository,
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
export class FilesModule {}
