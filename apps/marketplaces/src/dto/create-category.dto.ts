import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    type: String,
    description: 'Title of the category',
    example: 'Category 1',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 50)
  title: string;

  @ApiProperty({
    type: String,
    description: 'Description of the category',
    example: 'Description of the category',
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  description: string;
}
