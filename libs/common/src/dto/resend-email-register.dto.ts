import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ResendEmailRegisterDto {
  @ApiProperty({
    type: String,
    description: 'Email of user',
    required: true,
    example: 'john_doe@gmail.com',
  })
  @IsEmail()
  email: string;
}
