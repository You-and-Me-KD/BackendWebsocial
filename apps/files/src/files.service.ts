import { CreateFileDto } from './dto/create-file.dto';
import { Injectable } from '@nestjs/common';
import { FilesRepository } from './files.repository';
import { FileDomain } from './domain';
import { UpdateFileDto } from './dto/update-file.dto';

@Injectable()
export class FilesService {
  constructor(private readonly filesRepository: FilesRepository) {}

  async findOne(filterQuery: Partial<FileDomain>) {
    return this.filesRepository.findOne({ where: filterQuery });
  }

  async create(createFileDto: CreateFileDto) {
    return this.filesRepository.create(createFileDto);
  }

  async update(id: string, updateFileDto: UpdateFileDto) {
    return this.filesRepository.findOneAndUpdate(
      { where: { id } },
      updateFileDto,
    );
  }

  async remove(id: string) {
    return this.filesRepository.findOneAndDelete({ where: { id } });
  }

  async findAll() {
    return this.filesRepository.find({});
  }
}
