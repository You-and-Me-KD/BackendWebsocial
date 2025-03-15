import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';

@Controller()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  async findAll() {
    return this.filesService.findAll();
  }

  @Get(':id')
  async findOne(@Body() id: string) {
    return this.filesService.findOne({ id });
  }

  @Patch(':id')
  async update(@Body() id: string, @Body() updateFileDto: UpdateFileDto) {
    return this.filesService.update(id, updateFileDto);
  }

  @Delete(':id')
  async remove(@Body() id: string) {
    return this.filesService.remove(id);
  }
}
