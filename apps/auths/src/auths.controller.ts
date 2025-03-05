import { Controller, Post, Res, UseGuards } from '@nestjs/common';
import { UserEntity } from 'apps/users/src/users/entities/user.entity';
import { Response } from 'express';
import { AuthsService } from './auths.service';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guard/local-auth.gaurd';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserEntity,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authsService.login(user, response);
    return user;
  }
}
