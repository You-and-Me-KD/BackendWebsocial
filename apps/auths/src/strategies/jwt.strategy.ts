import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from '../interface/token-payload.interface';
import { MICRO_SERVICE_KEYS, USERS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.cookies?.Authentication || request?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') as string,
    });
  }

  async validate({ id }: TokenPayload) {
    return this.userClient.send(MICRO_SERVICE_KEYS.USERS.GET_USER, { id });
  }
}
