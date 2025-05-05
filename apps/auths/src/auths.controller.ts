import {
  CurrentUser,
  LoginDto,
  MICRO_SERVICE_KEYS,
  RegisterDto,
  ResendEmailRegisterDto,
} from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserDomain } from 'apps/users/src/domain';
import { Response } from 'express';
import { AuthsService } from './auths.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { VerifyTokenDto } from '@app/common/dto/verify-token.dto';

@Controller('auths')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Login user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user information and set cookie',
    type: UserDomain,
  })
  @ApiBody({ type: LoginDto })
  @Post('login')
  async login(
    @CurrentUser() user: UserDomain,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authsService.login(user, response);
    return plainToClass(UserDomain, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@CurrentUser() user: UserDomain) {
    return plainToClass(UserDomain, user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('Authentication');
    return { message: 'Logout successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @MessagePattern(MICRO_SERVICE_KEYS.AUTH.AUTHENTICATE)
  async authenticate(@Payload() data: any) {
    return data.user;
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Register new user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user information',
    type: UserDomain,
  })
  @Post('register')
  async register(
    @Body()
    data: RegisterDto,
  ) {
    return this.authsService.register(data);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Verify register',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user information',
    type: UserDomain,
  })
  @Post('verify-token')
  async verifyToken(
    @Body()
    data: VerifyTokenDto,
  ) {
    return this.authsService.verifyToken(data);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    description: 'Resend verify token',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return user information',
  })
  @Post('resend-email-register')
  async sendMailRegister(
    @Body()
    data: ResendEmailRegisterDto,
  ) {
    return this.authsService.sendMailRegister(data);
  }
}
