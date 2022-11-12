import {
  Controller,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { carbonCertificateApiParams } from './carbonCertificate.ApiParams';
import { CarbonCertificateService } from './carbonCertificate.service';

@ApiTags('Carbon Certificate')
@Controller({
  path: 'carbon-certificates',
  version: '1',
})
export class CarbonCertifcateController {
  constructor(
    private readonly carbonCertifcateService: CarbonCertificateService,
  ) {}

  @ApiQuery({ name: 'status', type: String, required: false })
  @ApiQuery({ name: 'paginate', type: Boolean, required: false })
  @ApiQuery({ name: 'limit', type: Number, required: false })
  @ApiQuery({ name: 'page', type: Number, required: false })
  @Get('')
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(@Query() query: carbonCertificateApiParams) {
    return this.carbonCertifcateService.getAll(query);
  }
}
