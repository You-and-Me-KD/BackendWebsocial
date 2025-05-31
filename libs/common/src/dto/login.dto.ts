import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';
import { ErrorCode } from '../exception';

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
  @MinLength(8, { message: ErrorCode.MIN_LENGTH_8 })
  @Matches(/[A-Z]/, {
    message: ErrorCode.AT_LEAST_ONE_UPPERCASE_LETTER,
  })
  @Matches(/[a-z]/, {
    message: ErrorCode.AT_LEAST_ONE_LOWERCASE_LETTER,
  })
  @Matches(/\d/, { message: ErrorCode.AT_LEAST_ONE_NUMBER })
  @Matches(/[!@#$%^&*]/, {
    message: ErrorCode.AT_LEAST_ONE_SPECIAL_CHARACTER,
  })
  password: string;
}
