import { IsArray, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { ApiParams } from '../ApiParams';
import { CarbonCertifcateStatus } from './constants/carbonCertificate.constants';
export class carbonCertificateApiParams extends ApiParams {
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  @IsIn(
    [
      CarbonCertifcateStatus.AVAILABLE,
      CarbonCertifcateStatus.OWNED,
      CarbonCertifcateStatus.TRANSFERRED,
    ],
    { each: true },
  )
  status: string[];
}
