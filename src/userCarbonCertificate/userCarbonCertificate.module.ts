import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertificateEntity } from '../carbonCertificate/entities/carbonCertificate.entity';
import { UserEntity } from '../users/entities/user.entity';
import { UserCarbonCertificateController } from './userCarbonCertificate.controller';
import { UserCarbonCertificateService } from './userCarbonCertificate.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificateEntity, UserEntity])],

  controllers: [UserCarbonCertificateController],
  providers: [UserCarbonCertificateService],
})
export class UserCarbonCertificateModule {}
