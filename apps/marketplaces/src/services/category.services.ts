import { Injectable } from '@nestjs/common';
import { CategoryDomain } from '../domain';
import {
  CategoryFilterDto,
  CreateCategoryDto,
  UpdateCategoryDto,
} from '../dto';
import { CategoryRepository } from '../repositories';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async createCategory(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.create(createCategoryDto);
  }

  async findWithPagination(categoryFilterDto: CategoryFilterDto) {
    const filterQuery = {
      title: categoryFilterDto.title,
      description: categoryFilterDto.description,
    };
    const sortOptions = {
      orderBy: categoryFilterDto.orderBy,
      orderDirection: categoryFilterDto.orderDirection,
    };
    const paginationOptions = {
      page: categoryFilterDto.page,
      limit: categoryFilterDto.limit,
    };
    return await this.categoryRepository.findWithPagination(
      { where: filterQuery },
      sortOptions,
      paginationOptions,
    );
  }

  async findOne(filterQuery: Pick<CategoryDomain, 'id'>) {
    return await this.categoryRepository.findOne({
      where: { id: filterQuery.id },
    });
  }

  async findOneAndUpdate(updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryRepository.findOneAndUpdate(
      { where: { id: updateCategoryDto.id } },
      updateCategoryDto,
    );
  }

  async findOneAndDelete(filterQuery: Pick<CategoryDomain, 'id'>) {
    return await this.categoryRepository.findOneAndDelete({
      where: { id: filterQuery.id },
    });
  }
}
