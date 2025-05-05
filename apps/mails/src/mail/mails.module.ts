import { ExceptionFilter, LoggerInterceptor, LoggerModule } from '@app/common';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { MailerService } from '../mailer/mailer.service';
import { MailsController } from '../mails.controller';
import { MailerModule } from './../mailer/mailer.module';
import { MailService } from './mail.service'; // Import MailService

@Module({
  imports: [LoggerModule, MailerModule],
  controllers: [MailsController],
  providers: [
    MailerService,
    MailService,
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
