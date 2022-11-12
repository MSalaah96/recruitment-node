import { IsNotEmpty, IsString } from 'class-validator';
export class TransferCarbonCertificateDto {
  @IsString()
  @IsNotEmpty()
  userId: string;
  @IsString()
  @IsNotEmpty()
  carbonCertificateId: string;
}
