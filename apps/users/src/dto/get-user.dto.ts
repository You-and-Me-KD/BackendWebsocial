import { IsString } from 'class-validator';

export class GetUserDto {
  @IsString()
  id: string;
}
