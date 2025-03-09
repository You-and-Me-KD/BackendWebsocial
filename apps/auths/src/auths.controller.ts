import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { AuthsService } from './auths.service';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDomain } from 'apps/users/src/users';
import { CurrentUser } from '@app/common';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDomain,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authsService.login(user, response);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: UserDomain) {
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return { message: 'Logout successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern('authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
