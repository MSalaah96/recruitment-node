import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: `user email to be used for login`,
    example: `user@example.com`,
  })
  @IsNotEmpty()
  @IsEmail()
  username: string;
  @ApiProperty({
    description: `user password to be used for login`,
    example: `P@ssw0rd`,
  })
  @IsNotEmpty()
  @Matches(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})`)
  password: string;
}
