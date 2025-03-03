import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users/entities/user.entity';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionFilter } from '@app/common/exceptions';

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
  ],
})
export class UsersModule {}
