import {
  LoginDto,
  MICRO_SERVICE_KEYS,
  RegisterDto,
  UnauthorizedException,
  USERS_SERVICE,
} from '@app/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { UserDomain } from 'apps/users/src/domain';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { lastValueFrom } from 'rxjs';
import { TokenPayload } from './interface/token-payload.interface';

@Injectable()
export class AuthsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
  ) {}
  async verifyUser({ email, password, username }: LoginDto) {
    try {
      const user = await lastValueFrom(
        this.userClient.send(MICRO_SERVICE_KEYS.USERS.FIND_ONE_USER, {
          email,
          username,
        }),
      );
      const isMatchPassword = await bcryptjs.compare(
        password,
        user.hashedPassword,
      );
      if (!isMatchPassword) {
        throw new UnauthorizedException('Credentials not match');
      }
      return user;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(user: UserDomain, response: Response) {
    const tokenPayload: TokenPayload = { id: user.id, email: user.email };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() +
        (this.configService.get<number>('JWT_EXPIRES_IN') || 3600),
    );
    const token = this.jwtService.sign(tokenPayload);
    response.cookie('Authentication', token, {
      expires,
      httpOnly: true,
    });
  }

  async register(data: RegisterDto) {
    return this.userClient.send(MICRO_SERVICE_KEYS.USERS.REGISTER, data);
  }
}
