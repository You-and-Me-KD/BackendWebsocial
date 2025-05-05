import { IsString } from 'class-validator';

export class VerifyRegisterDto {
  @IsString()
  email: string;

  @IsString()
  token: string;
}
