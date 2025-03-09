import { UnauthorizedException } from '@app/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'apps/users/src/users.service';
import * as bcryptjs from 'bcryptjs';
import { Response } from 'express';
import { TokenPayload } from './interface/token-payload.interface';
import { UserDomain } from 'apps/users/src/users';

@Injectable()
export class AuthsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async verifyUser(email: string, password: string) {
    const user = await this.usersService.findOne({ email });
    const isMatchPassword = await bcryptjs.compare(
      password,
      user.hashedPassword,
    );
    if (!isMatchPassword) {
      throw new UnauthorizedException('Credentials not match');
    }

    return user;
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
}
