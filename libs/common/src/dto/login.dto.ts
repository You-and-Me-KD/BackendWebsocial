import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Email of user',
    type: String,
    example: 'john@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Username of user',
    type: String,
    example: 'michalelee',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    type: String,
    description: 'Password of user',
    required: true,
    example: 'password',
  })
  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[A-Z]/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/[a-z]/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/\d/, { message: 'Password must contain at least one number' })
  @Matches(/[!@#$%^&*]/, {
    message: 'Password must contain at least one special character (!@#$%^&*)',
  })
  password: string;
}
