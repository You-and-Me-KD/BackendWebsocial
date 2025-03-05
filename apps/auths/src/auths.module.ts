import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import * as Joi from 'joi';
import { AuthsService } from './auths.service';
import { ExceptionFilter, LoggerInterceptor, LoggerModule } from '@app/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import { AuthsController } from './auths.controller';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/auths/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRES_IN: Joi.string().required(),
        PORT: Joi.number(),
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
  ],
  controllers: [AuthsController],
  providers: [
    AuthsService,
    {
      provide: APP_FILTER,
      useClass: ExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AuthsModule {}
