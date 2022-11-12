import { Test, TestingModule } from '@nestjs/testing';
import { UserCarbonCertificateController } from './userCarbonCertificate.controller';

describe('UserCarbonCertificateController', () => {
  let controller: UserCarbonCertificateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserCarbonCertificateController],
    }).compile();

    controller = module.get<UserCarbonCertificateController>(
      UserCarbonCertificateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
