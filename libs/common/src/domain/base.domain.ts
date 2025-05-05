import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseDomain {
  @ApiProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'ID type by UUID',
  })
  id?: string;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Created date of the user',
  })
  createdAt?: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Updated date of the user',
  })
  updatedAt?: Date;

  @ApiProperty({
    type: Date,
    example: new Date(),
    description: 'Deleted date of the user',
  })
  deletedAt?: Date;
}
