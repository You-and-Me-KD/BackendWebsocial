import { Controller, Get } from '@nestjs/common';
import { MarketplacesService } from '../services/marketplaces.service';

@Controller()
export class MarketplacesController {
  constructor(private readonly marketplacesService: MarketplacesService) {}

  @Get()
  getHello(): string {
    return this.marketplacesService.getHello();
  }
}
