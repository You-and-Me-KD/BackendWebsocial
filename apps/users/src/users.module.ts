import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, LoggerInterceptor, LoggerModule } from '@app/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users/entities/user.entity';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from '@app/common/exception';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature({ typeormEntities: [UserEntity] }),
    LoggerModule,
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
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class UsersModule {}
