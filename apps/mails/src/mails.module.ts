import { Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { ConfigModule } from '@nestjs/config';
import { ExceptionFilter, LoggerInterceptor, LoggerModule } from '@app/common';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    LoggerModule,

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/mails/.env',
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
      }),
    }),
  ],
  controllers: [],
  providers: [
    MailsService,
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
export class MailsModule {}
