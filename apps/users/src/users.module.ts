import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '@app/common';
import { UsersRepository } from './users.repository';
import { UserEntity } from './users/entities/user.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature({ typeormEntities: [UserEntity] }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
