import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarbonCertificateEntity } from '../carbonCertificate/entities/carbonCertificate.entity';
import { UserEntity } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { UserCarbonCertificateService } from './userCarbonCertificate.service';

describe('UserCarbonCertificateService', () => {
  let service: UserCarbonCertificateService;
  let usersRepository: Repository<UserEntity>;
  const USER_REPOSITORY_TOKEN = getRepositoryToken(UserEntity);
  let carbonCertificateRepository: Repository<CarbonCertificateEntity>;
  const CARBON_CERTIFICATE_REPOSITORY_TOKEN = getRepositoryToken(
    CarbonCertificateEntity,
  );
  let carbonCertificate;
  beforeEach(async () => {
    carbonCertificate = {
      id: 'c3b296f8-fa1f-419c-8c2b-1a5cb5c53f4b',
      country: 'Guinea',
      status: 'owned',
      ownerId: 'ced9d1d7-168f-4463-8ea9-e06188a5fc9c',
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserCarbonCertificateService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findOneBy: jest.fn((u) => u),
          },
        },
        {
          provide: CARBON_CERTIFICATE_REPOSITORY_TOKEN,
          useValue: {
            findOneBy: jest.fn(() => carbonCertificate),
            find: jest.fn(() => [carbonCertificate]),
            save: jest.fn((c) => c),
          },
        },
      ],
    }).compile();

    service = module.get<UserCarbonCertificateService>(
      UserCarbonCertificateService,
    );
    usersRepository = module.get<Repository<UserEntity>>(USER_REPOSITORY_TOKEN);
    carbonCertificateRepository = module.get<
      Repository<CarbonCertificateEntity>
    >(CARBON_CERTIFICATE_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('usersRepository should be defined', () => {
    expect(usersRepository).toBeDefined();
  });
  it('carbonCertificateRepository should be defined', () => {
    expect(carbonCertificateRepository).toBeDefined();
  });
  describe('getUserCertificates', () => {
    it('should return list of user certificates', async () => {
      service.getUserCertificates('1');
      expect(carbonCertificateRepository.find).toBeCalledWith({
        where: { ownerId: '1' },
      });
    });
  });
  describe('transferCertificate', () => {
    it('should transfer certificate to new owner', async () => {
      const newOwner = '2';
      service.transfer(carbonCertificate.ownerId, {
        userId: newOwner,
        carbonCertificateId: carbonCertificate.id,
      });
      expect(carbonCertificateRepository.findOneBy).toBeCalledWith({
        id: carbonCertificate.id,
      });
    });
  });
});
