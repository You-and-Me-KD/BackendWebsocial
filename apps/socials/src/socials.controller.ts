import { Controller, Get } from '@nestjs/common';
import { SocialsService } from './socials.service';

@Controller()
export class SocialsController {
  constructor(private readonly socialsService: SocialsService) {}

  @Get()
  getHello(): string {
    return this.socialsService.getHello();
  }
}
