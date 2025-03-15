import { ApiProperty } from '@nestjs/swagger';
import { FILE_ENUM } from '../enums';
import { BaseDomain } from '@app/common/domain';

export class FileDomain extends BaseDomain {
  @ApiProperty({
    type: String,
    example: 'https://www.example.com/image.jpg',
    description: 'URL of the file',
  })
  url: string;

  @ApiProperty({
    type: 'string',
    enum: FILE_ENUM,
    example: FILE_ENUM.IMAGE,
    description: 'Type of the file',
  })
  type: FILE_ENUM;
}
