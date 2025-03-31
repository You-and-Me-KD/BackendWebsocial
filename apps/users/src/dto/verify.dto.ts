import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyDto {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Token to verify active account',
  })
  @IsString()
  token: string;
}
