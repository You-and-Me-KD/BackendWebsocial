import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthsService } from './auths.service';
import {
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
  MAIL_SERVICE,
  USERS_SERVICE,
} from '@app/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthsController } from './auths.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RedisModule } from '@app/common/redis/redis.module';

@Module({
  imports: [
    RedisModule,
    PassportModule,
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/auths/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        VERIFY_MAIL_SECRET: Joi.string().required(),
        VERIFY_MAIL_EXPIRES_IN: Joi.string().required(),
        TCP_PORT: Joi.number().required(),
        HTTP_PORT: Joi.number().required(),
        USER_HOST: Joi.string().required(),
        USER_PORT: Joi.number().required(),
        MAIL_HOST: Joi.string().required(),
        MAIL_PORT: Joi.number().required(),
        API_PREFIX: Joi.string().default('api'),
      }),
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWT_EXPIRES_IN')}s`,
        },
      }),
      inject: [ConfigService],
    }),
    ClientsModule.registerAsync([
      {
        name: USERS_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_HOST'),
            port: configService.get<number>('USER_PORT'),
          },
        }),
        inject: [ConfigService],
      },
      {
        name: MAIL_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('MAIL_HOST'),
            port: configService.get<number>('MAIL_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthsController],
  providers: [
    AuthsService,
    LocalStrategy,
    JwtStrategy,
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
export class AuthsModule {}
