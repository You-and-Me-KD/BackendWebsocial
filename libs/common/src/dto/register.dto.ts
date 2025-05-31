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
import { ErrorCode } from '../exception';

export class RegisterDto {
  @ApiProperty({
    type: String,
    description: 'User name of user',
    required: true,
    example: 'john_doe',
  })
  @IsString({
    message: ErrorCode.USERNAME_MUST_BE_STRING,
  })
  @Length(6, 20, {
    message: ErrorCode.USERNAME_LENGTH_BETWEEN_6_AND_20,
  })
  @Transform(({ value }) => value.trim())
  @Matches(/^[a-zA-Z0-9]+$/, {
    message: ErrorCode.USERNAME_MUST_BE_ALPHANUMERIC,
  })
  username: string;

  @ApiProperty({
    type: String,
    description: 'Email of user',
    required: true,
    example: 'john_doe@gmail.com',
  })
  @IsEmail(
    {},
    {
      message: ErrorCode.MUST_BE_AN_EMAIL,
    },
  )
  email: string;

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

  @ApiProperty({
    type: Boolean,
    description: 'Check to get new by mail',
    required: false,
    default: false,
  })
  @IsOptional()
  isGetNewByMail: boolean;
}
