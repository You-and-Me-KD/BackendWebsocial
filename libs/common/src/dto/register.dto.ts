import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'User name of user',
    required: true,
    example: 'john_doe',
  })
  @IsString()
  @Length(6, 20)
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9]+$/)
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email of user',
    required: true,
    example: 'john_doe@gmail.com',
  })
  @IsEmail()
  email: string;

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

  @ApiProperty({
    type: Boolean,
    description: 'Check to get new by mail',
    required: false,
    default: false,
  })
  @IsOptional()
  isGetNewByMail: boolean;
}
