import {
  Body,
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TransferCarbonCertificateDto } from './dtos/transferCarbonCertificate.dto';
import { UserCarbonCertificateService } from './userCarbonCertificate.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('User Carbon Certificates')
@Controller({
  path: 'user-carbon-certificates',
  version: '1',
})
@ApiBearerAuth()
export class UserCarbonCertificateController {
  constructor(
    private readonly userCarbonCertifcateService: UserCarbonCertificateService,
  ) {}

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  getAll(@Request() req) {
    return this.userCarbonCertifcateService.getUserCertificates(req.user.sub);
  }
  @Post('transfer')
  @UseGuards(AuthGuard('jwt'))
  transfer(
    @Body() transferCarbonCertificateDto: TransferCarbonCertificateDto,
    @Request() req,
  ) {
    return this.userCarbonCertifcateService.transfer(
      req.user.sub,
      transferCarbonCertificateDto,
    );
  }
}
