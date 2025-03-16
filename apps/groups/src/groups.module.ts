import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import {
  DatabaseModule,
  ExceptionFilter,
  LoggerInterceptor,
  LoggerModule,
} from '@app/common';
import { GroupEntity } from './entities/group.entity';
import { GroupMemberEntity } from './entities/group-member.entity';
import { GroupInvitationEntity } from './entities/group-invitation.entity';
import { GroupSocialNetworkEntity } from './entities/group-social-network.entity';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    DatabaseModule.forRoot({
      useTypeOrm: true,
      useMongoose: false,
    }),
    DatabaseModule.forFeature({
      typeormEntities: [
        GroupEntity,
        GroupMemberEntity,
        GroupInvitationEntity,
        GroupSocialNetworkEntity,
      ],
    }),
    LoggerModule,
    ConfigModule.forRoot({
      envFilePath: './apps/groups/.env',
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_TYPE: Joi.string().required(),
        DATABASE_HOST: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        DATABASE_USER: Joi.string().required(),
        DATABASE_PASSWORD: Joi.string().required(),
        DATABASE_DB: Joi.string().required(),
        DB_SYNC: Joi.boolean().default(false),
        PORT: Joi.number().required(),
        API_PREFIX: Joi.string().default('api'),
      }),
    }),
  ],
  controllers: [GroupsController],
  providers: [
    GroupsService,
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
export class GroupsModule {}
