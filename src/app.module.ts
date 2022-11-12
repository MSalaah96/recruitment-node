import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { typeOrmAsyncConfig } from './config/typeorm.config';
import { UserCarbonCertifcateService } from './user-carbon-certifcate/user-carbon-certifcate.service';
import { CarbonCertifcateModule } from './carbonCertificate/carbonCertificate.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        ttl: config.get('APP_THROTTLE_TTL'),
        limit: config.get('APP_THROTTLE_LIMIT'),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuthModule,
    UsersModule,
    CarbonCertifcateModule,
  ],
  controllers: [AppController],
  providers: [AppService, Logger, UserCarbonCertifcateService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
