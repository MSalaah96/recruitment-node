import { Test, TestingModule } from '@nestjs/testing';
import { UserCarbonCertifcateService } from './user-carbon-certifcate.service';

describe('UserCarbonCertifcateService', () => {
  let service: UserCarbonCertifcateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCarbonCertifcateService],
    }).compile();

    service = module.get<UserCarbonCertifcateService>(UserCarbonCertifcateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
