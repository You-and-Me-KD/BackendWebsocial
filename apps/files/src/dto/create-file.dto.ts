import { IsEnum, IsString } from 'class-validator';
import { FILE_ENUM } from '../enums';

export class CreateFileDto {
  @IsString()
  url: string;

  @IsEnum(FILE_ENUM)
  type: FILE_ENUM;
}
