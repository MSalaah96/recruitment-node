import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarbonCertifcateController } from './carbon-certifcate.controller';
import { CarbonCertifcateService } from './carbon-certifcate.service';
import { CarbonCertificateEntity } from './entities/carbon-certifcate.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CarbonCertificateEntity])],
  controllers: [CarbonCertifcateController],
  providers: [CarbonCertifcateService],
})
export class CarbonCertifcateModule {}
