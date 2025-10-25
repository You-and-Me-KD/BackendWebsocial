import { JwtAuthGuard, Roles, RolesGuard } from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { USER_ROLE } from 'apps/users/src/enums';
import { CategoryDomain } from '../domain';
import { CategoryService } from '../services/category.services';
import { CategoryFilterDto, CreateCategoryDto } from '../dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return one category',
    type: CategoryDomain,
  })
  @ApiOperation({
    summary: 'Find one category',
    description: 'Find one category by ID',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Category ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.categoryService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return all categories',
    type: [CategoryDomain],
  })
  @ApiOperation({
    summary: 'Find all categories',
    description: 'Find all categories',
  })
  @Get()
  async findWithPagination(@Query() query: CategoryFilterDto) {
    return await this.categoryService.findWithPagination(query);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Create a new category',
    type: CategoryDomain,
  })
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Create a new category',
  })
  @ApiBody({
    type: CreateCategoryDto,
  })
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.createCategory(createCategoryDto);
  }
}
