import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class TransferCarbonCertificateDto {
  @ApiProperty({
    description: `user id the certificate will be transferred to`,
    example: `c3b296f8-fa1f-419c-8c2b-1a5cb5c53f4b`,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    description: `certificate id that will be transferred`,
    example: `c3b296f8-fa1f-419c-8c2b-1a5cb5c53f4b`,
  })
  @IsString()
  @IsNotEmpty()
  carbonCertificateId: string;
}
