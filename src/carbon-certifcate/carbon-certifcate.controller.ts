import { Controller, Get, Req } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { CarbonCertifcateService } from './carbon-certifcate.service';

@ApiTags('Carbon Certifcate')
@Controller({
  path: 'carbon-certifcates',
  version: '1',
})
export class CarbonCertifcateController {
  constructor(
    private readonly carbonCertifcateService: CarbonCertifcateService,
  ) {}

  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'paginate', type: Boolean, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'oage', type: Number, required: false })
  @Get('')
  getAll(@Req() req) {
    return this.carbonCertifcateService.getAll(req.query);
  }
}
