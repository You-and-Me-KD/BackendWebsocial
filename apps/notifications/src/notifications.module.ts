import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import {
  DatabaseModule,
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
} from '@app/common';
import {
  NotificationDocument,
  NotificationQueueDocument,
  NotificationQueueSchema,
  NotificationSchema,
  NotificationSettingsDocument,
  NotificationSettingsSchema,
  NotificationTemplateDocument,
  NotificationTemplateSchema,
} from './models';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [
    DatabaseModule.forRoot({ useTypeOrm: false, useMongoose: true }),
    DatabaseModule.forFeature({
      mongooseModels: [
        { name: NotificationDocument.name, schema: NotificationSchema },
        {
          name: NotificationQueueDocument.name,
          schema: NotificationQueueSchema,
        },
        {
          name: NotificationSettingsDocument.name,
          schema: NotificationSettingsSchema,
        },
        {
          name: NotificationTemplateDocument.name,
          schema: NotificationTemplateSchema,
        },
      ],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/notifications/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_HOST: Joi.string().required(),
        MONGO_PORT: Joi.number().required(),
        MONGO_USER: Joi.string().required(),
        MONGO_PASSWORD: Joi.string().required(),
        MONGO_DB: Joi.string().required(),
        PORT: Joi.number().required(),
        API_PREFIX: Joi.string().default('api'),
      }),
    }),
  ],
  controllers: [NotificationsController],
  providers: [
    NotificationsService,
    NotificationsRepository,
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
export class NotificationsModule {}
