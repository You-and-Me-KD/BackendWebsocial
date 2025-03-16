import { Controller, Get } from '@nestjs/common';
import { GroupsService } from './groups.service';

@Controller()
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  getHello(): string {
    return this.groupsService.getHello();
  }
}
