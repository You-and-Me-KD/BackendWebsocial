import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {
  getHello(): string {
    return 'Hello World!';
  }
}
