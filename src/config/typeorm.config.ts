import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (config: ConfigService): TypeOrmModuleOptions => {
    return {
      type: 'postgres',
      host: config.get('DATABASE_HOST'),
      port: config.get('DATABASE_PORT'),
      username: config.get('DATABASE_USER'),
      password: config.get('DATABASE_PASSWORD'),
      database: config.get('DATABASE_NAME'),
      entities: [__dirname + '/../**/*.entity.{js,ts}'],
      synchronize: config.get('DATABASE_SYNC'),
      logging: true,
    };
  },
};
