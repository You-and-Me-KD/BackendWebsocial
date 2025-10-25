import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketplacesService {
  getHello(): string {
    return 'Hello World!';
  }
}
