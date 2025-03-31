import { UnauthorizedException } from '@app/common';
import { AuthsService } from './../auths.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authsService: AuthsService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    try {
      const isEmail = /\S+@\S+\.\S+/.test(email);
      if (isEmail) {
        return this.authsService.verifyUser({
          email: email,
          password,
        });
      } else {
        return this.authsService.verifyUser({
          username: email,
          password,
        });
      }
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
