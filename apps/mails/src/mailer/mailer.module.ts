import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { MailerService } from './mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/mails/.env',
      validationSchema: Joi.object({
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().required(),
        MAIL_USER: Joi.string().required(),
        MAIL_PASSWORD: Joi.string().required(),
        MAIL_FROM: Joi.string().required(),
        MAIL_SECURE: Joi.boolean().default(true),
        APP_URL: Joi.string().required(),
        TCP_PORT: Joi.number().required(),
        MAIL_SERVICE: Joi.string().optional(),
        MAIL_IGNORE_TLS: Joi.boolean().default(false),
        MAIL_REQUIRE_TLS: Joi.boolean().default(false),
      }),
    }),
  ],
  controllers: [],
  exports: [MailerService],
  providers: [MailerService],
})
export class MailerModule {}
