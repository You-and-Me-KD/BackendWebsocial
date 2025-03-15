import { Injectable } from '@nestjs/common';

@Injectable()
export class SocialsService {
  getHello(): string {
    return 'Hello World!';
  }
}
