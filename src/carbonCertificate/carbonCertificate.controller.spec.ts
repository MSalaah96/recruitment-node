import { Test, TestingModule } from '@nestjs/testing';
import { CarbonCertifcateController } from './carbonCertificate.controller';

describe('CarbonCertifcateController', () => {
  let controller: CarbonCertifcateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarbonCertifcateController],
    }).compile();

    controller = module.get<CarbonCertifcateController>(
      CarbonCertifcateController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
