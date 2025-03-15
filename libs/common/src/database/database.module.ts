import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({})
export class DatabaseModule {
  static forRoot(options: {
    useTypeOrm?: boolean;
    useMongoose?: boolean;
  }): DynamicModule {
    const imports = [];
    if (options.useTypeOrm) {
      imports.push(
        TypeOrmModule.forRootAsync({
          imports: [],
          inject: [ConfigService],
          useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
            type: configService.get<any>('DATABASE_TYPE', 'postgres'),
            host: configService.get<string>('DATABASE_HOST'),
            port: configService.get<number>('DATABASE_PORT'),
            username: configService.get<string>('DATABASE_USER'),
            password: configService.get<string>('DATABASE_PASSWORD'),
            database: configService.get<string>('DATABASE_DB'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
            synchronize: configService.get<boolean>('DB_SYNC', false),
            namingStrategy: new SnakeNamingStrategy(),
          }),
        }),
      );
    }
    if (options.useMongoose) {
      imports.push(
        MongooseModule.forRootAsync({
          imports: [],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            const host = configService.get<string>('MONGO_HOST');
            const port = configService.get<number>('MONGO_PORT');
            const user = configService.get<string>('MONGO_USER');
            const password = configService.get<string>('MONGO_PASSWORD');
            const db = configService.get<string>('MONGO_DB');
            const uri = `mongodb://${user}:${password}@${host}:${port}/${db}?authSource=admin`;
            console.log(uri, 'KHIEM');
            return {
              uri,
            };
          },
        }),
      );
    }
    return {
      module: DatabaseModule,
      imports,
    };
  }

  static forFeature(options: {
    mongooseModels?: ModelDefinition[];
    typeormEntities?: EntityClassOrSchema[];
  }): DynamicModule {
    const imports = [];

    if (options.mongooseModels?.length) {
      imports.push(MongooseModule.forFeature(options.mongooseModels));
    }

    if (options.typeormEntities?.length) {
      imports.push(TypeOrmModule.forFeature(options.typeormEntities));
    }

    return {
      module: DatabaseModule,
      imports,
      exports: imports,
    };
  }
}
