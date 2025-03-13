import { ApiProperty } from '@nestjs/swagger';
import { FILE_ENUM } from '../enums';
import { BaseDomain } from '@app/common/domain';

export class FileDomain extends BaseDomain {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'File ID type by UUID',
  })
  id: string;

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
