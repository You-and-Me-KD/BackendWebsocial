import { BaseDomain } from '@app/common/domain';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryDomain extends BaseDomain {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'Category ID type by UUID',
  })
  id: string;

  @ApiProperty({
    type: String,
    example: 'Category 1',
    description: 'Title of the category',
  })
  title: string;

  @ApiProperty({
    type: String,
    example: 'Description of the category',
    description: 'Description of the category',
  })
  description: string;
}
