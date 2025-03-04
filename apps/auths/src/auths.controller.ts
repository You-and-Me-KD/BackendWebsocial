import { Controller, Get } from '@nestjs/common';
import { AuthsService } from './auths.service';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Get()
  getHello(): string {
    return this.authsService.getHello();
  }
}
