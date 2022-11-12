import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { carbonCertificateApiParams } from './carbonCertificate.ApiParams';
import { CarbonCertificateService } from './carbonCertificate.service';
import { CarbonCertificateEntity } from './entities/carbonCertificate.entity';
import { CarbonCertifcateStatus } from './constants/carbonCertificate.constants';

describe('CarbonCertifcateService', () => {
  let service: CarbonCertificateService;
  let carbonCertificateRepository: Repository<CarbonCertificateEntity>;
  const CARBON_CERTIFICATE_REPOSITORY_TOKEN = getRepositoryToken(
    CarbonCertificateEntity,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarbonCertificateService,
        {
          provide: CARBON_CERTIFICATE_REPOSITORY_TOKEN,
          useValue: {
            count: jest.fn(() => 1),
            find: jest.fn(() => [{}]),
          },
        },
      ],
    }).compile();

    service = module.get<CarbonCertificateService>(CarbonCertificateService);
    carbonCertificateRepository = module.get<
      Repository<CarbonCertificateEntity>
    >(CARBON_CERTIFICATE_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('carbonCertificateRepository should be defined', () => {
    expect(carbonCertificateRepository).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of carbon certificates', async () => {
      const params = {
        paginate: false,
      } as carbonCertificateApiParams;
      const result = await service.getAll(params);
      expect(result).toEqual([{}]);
    });
    it('should return an paginated array of carbon certificates', async () => {
      const params = {
        paginate: true,
        page: 1,
        limit: 10,
      } as carbonCertificateApiParams;
      const result = await service.getAll(params);
      expect(result).toEqual({ length: 1, page: 1, pages: 1, result: [{}] });
    });
    it('should filter with status and return array of carbon certificates', async () => {
      const params = {
        paginate: false,
        status: [CarbonCertifcateStatus.AVAILABLE],
      } as carbonCertificateApiParams;
      const result = await service.getAll(params);
      expect(result).toEqual([{}]);
      expect(carbonCertificateRepository.find).toBeCalledWith({
        where: { status: In([CarbonCertifcateStatus.AVAILABLE]) },
      });
    });
    it('should filter with status and return paginated array of carbon certificates', async () => {
      const params = {
        paginate: true,
        page: 0,
        limit: 10,
        status: [CarbonCertifcateStatus.AVAILABLE],
      } as carbonCertificateApiParams;
      const result = await service.getAll(params);
      expect(result).toEqual({ length: 1, page: 0, pages: 1, result: [{}] });
      expect(carbonCertificateRepository.find).toBeCalledWith({
        where: { status: In([CarbonCertifcateStatus.AVAILABLE]) },
        skip: 0,
        take: 10,
      });
    });
  });
});
