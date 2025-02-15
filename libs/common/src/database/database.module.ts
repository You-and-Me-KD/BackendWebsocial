import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<any>('DATABASE_TYPE', 'postgres'),
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_DB'),
        // entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        // autoLoadEntities: true,
        synchronize: configService.get<boolean>('DB_SYNC', false),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('MONGO_HOST');
        const port = configService.get<number>('MONGO_PORT');
        const user = configService.get<string>('MONGO_USER');
        const password = configService.get<string>('MONGO_PASSWORD');
        const db = configService.get<string>('MONGO_DB');
        const uri = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
