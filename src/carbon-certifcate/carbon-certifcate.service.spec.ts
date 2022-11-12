import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertifcateService } from './carbon-certifcate.service';

describe('CarbonCertifcateService', () => {
  let service: CarbonCertifcateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarbonCertifcateService],
    }).compile();

    service = module.get<CarbonCertifcateService>(CarbonCertifcateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
