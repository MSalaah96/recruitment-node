import { Test, TestingModule } from '@nestjs/testing';
import { UserCarbonCertificateService } from './userCarbonCertificate.service';

describe('UserCarbonCertificateService', () => {
  let service: UserCarbonCertificateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserCarbonCertificateService],
    }).compile();

    service = module.get<UserCarbonCertificateService>(
      UserCarbonCertificateService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
