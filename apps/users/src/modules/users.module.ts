import { Module } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { DatabaseModule, LoggerInterceptor, LoggerModule } from '@app/common';
import { UsersRepository } from '../repositories/users.repository';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from '@app/common/constants';
import { UserEntity } from '../entities';
import { UserPermissionEntity } from '../entities/user-permission.entity';
import { UserSocialEntity } from '../entities/user-social.entity';
import { SecurityInfoEntity } from '../entities/security-info.entity';
import { SecurityInfoQuestionEntity } from '../entities/security-info-question.entity';
import { SecurityQuestionEntity } from '../entities/security-question.entity';
import { InterestEntity } from '../entities/interest.entity';
import { BadgeEntity } from '../entities/badge.entity';
import { UserBadgeEntity } from '../entities/user-badge.entity';
import { ChannelFAQEntity } from '../entities/channel-faq.entity';
import { JobAndEducationEntity } from '../entities/job-and-education.entity';
import { StreamScheduleEntity } from '../entities/stream-schedule.entity';
import { PaymentMethodEntity } from '../entities/payment-method.entity';
import { UserPaymentMethodEntity } from '../entities/user-payment-method.entity';
import { AuthTokenEntity } from '../entities/auth-token.entity';
import { UsersController } from '../controllers';

@Module({
  imports: [
    DatabaseModule.forRoot({
      useMongoose: false,
      useTypeOrm: true,
    }),
    DatabaseModule.forFeature({
      typeormEntities: [
        UserEntity,
        UserPermissionEntity,
        UserSocialEntity,
        SecurityInfoEntity,
        SecurityInfoQuestionEntity,
        SecurityQuestionEntity,
        InterestEntity,
        BadgeEntity,
        UserBadgeEntity,
        ChannelFAQEntity,
        JobAndEducationEntity,
        StreamScheduleEntity,
        PaymentMethodEntity,
        UserPaymentMethodEntity,
        AuthTokenEntity,
      ],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/users/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
        HTTP_PORT: Joi.number().required(),
        TCP_PORT: Joi.number().required(),
        AUTH_HOST: Joi.string().required(),
        AUTH_PORT: Joi.number().required(),
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
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
