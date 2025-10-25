import { SortDirection } from '@app/common/type/abstract.sorting';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CategoryDomain } from '../domain';

export class CategoryFilterDto {
  @ApiProperty({
    type: String,
    description: 'Category title',
    example: 'Category 1',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    description: 'Category description',
    example: 'Description of the category',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: Number,
    description: 'Page number',
    example: 1,
    required: false,
  })
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    description: 'Limit number',
    example: 10,
    required: false,
  })
  @IsOptional()
  limit?: number;

  @ApiProperty({
    type: String,
    description: 'Order by',
    example: 'createdAt',
    required: false,
  })
  @IsString()
  @IsOptional()
  orderBy?: keyof CategoryDomain;

  @ApiProperty({
    type: String,
    description: 'Order direction',
    example: SortDirection.DESC,
    required: false,
  })
  @IsEnum(SortDirection)
  @IsOptional()
  orderDirection?: SortDirection;
}
