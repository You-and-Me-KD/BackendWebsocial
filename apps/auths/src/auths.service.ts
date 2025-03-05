import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthsService {
  getHello(): string {
    return 'Hello World!';
  }
}
