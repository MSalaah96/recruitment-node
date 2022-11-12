import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CarbonCertificateEntity } from '../carbonCertificate/entities/carbonCertificate.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { TransferCarbonCertificateDto } from './dtos/transferCarbonCertificate.dto';
import { CarbonCertifcateStatus } from '../carbonCertificate/constants/carbonCertificate.constants';

@Injectable()
export class UserCarbonCertificateService {
  constructor(
    @InjectRepository(CarbonCertificateEntity)
    private carbonCertificateRepository: Repository<CarbonCertificateEntity>,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async getUserCertificates(userId: string) {
    const carbonCertifcates = await this.carbonCertificateRepository.find({
      where: {
        ownerId: userId,
      },
    });
    return carbonCertifcates;
  }
  async transfer(
    owner: string,
    transferCarbonCertificateDto: TransferCarbonCertificateDto,
  ) {
    const carbonCertifcate = await this.carbonCertificateRepository.findOneBy({
      id: transferCarbonCertificateDto.carbonCertificateId,
    });
    if (!carbonCertifcate) {
      throw new BadRequestException('Carbon Certificate not found');
    }
    if (carbonCertifcate.ownerId !== owner) {
      throw new BadRequestException(
        'You are not the owner of this Carbon Certificate',
      );
    }
    const newOwner = await this.usersRepository.findOneBy({
      id: transferCarbonCertificateDto.userId,
    });
    if (!newOwner) {
      throw new BadRequestException('User not found');
    }
    carbonCertifcate.owner = newOwner;
    carbonCertifcate.status = CarbonCertifcateStatus.TRANSFERRED;
    return this.carbonCertificateRepository.save(carbonCertifcate);
  }
}
