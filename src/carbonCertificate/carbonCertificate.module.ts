import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertifcateController } from './carbonCertificate.controller';
import { CarbonCertificateService } from './carbonCertificate.service';
import { CarbonCertificateEntity } from './entities/carbonCertificate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificateEntity])],
  controllers: [CarbonCertifcateController],
  providers: [CarbonCertificateService],
})
export class CarbonCertifcateModule {}
