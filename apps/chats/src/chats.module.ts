import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import {
  DatabaseModule,
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
} from '@app/common';
import {
  AttachmentDocument,
  AttachmentSchema,
  ChatDocument,
  ChatMemberDocument,
  ChatMemberSchema,
  ChatSchema,
  DeliveryReceiptDocument,
  DeliveryReceiptSchema,
  LastMessageDocument,
  LastMessageSchema,
  MessageDocument,
  MessageSchema,
  ReactionDocument,
  ReactionSchema,
  ReadReceiptDocument,
  ReadReceiptSchema,
} from './models';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ChatsRepository } from './chats.repository';

@Module({
  imports: [
    DatabaseModule.forRoot({ useTypeOrm: false, useMongoose: true }),
    DatabaseModule.forFeature({
      mongooseModels: [
        { name: AttachmentDocument.name, schema: AttachmentSchema },
        { name: ChatMemberDocument.name, schema: ChatMemberSchema },
        { name: ChatDocument.name, schema: ChatSchema },
        { name: DeliveryReceiptDocument.name, schema: DeliveryReceiptSchema },
        { name: LastMessageDocument.name, schema: LastMessageSchema },
        { name: MessageDocument.name, schema: MessageSchema },
        { name: ReactionDocument.name, schema: ReactionSchema },
        { name: ReadReceiptDocument.name, schema: ReadReceiptSchema },
      ],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/chats/.env',
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
  controllers: [ChatsController],
  providers: [
    ChatsService,
    ChatsRepository,
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
export class ChatsModule {}
