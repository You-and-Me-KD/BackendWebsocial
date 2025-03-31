import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, map, Observable, tap } from 'rxjs';
import { AUTH_SERVICE, MICRO_SERVICE_KEYS } from '../constants';
import { UnauthorizedException } from '../exception';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly authClient: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwt = request.cookies.Authentication;
    if (!jwt) {
      return false;
    }
    return this.authClient
      .send(MICRO_SERVICE_KEYS.AUTH.AUTHENTICATE, { Authentication: jwt })
      .pipe(
        tap((res) => {
          context.switchToHttp().getRequest().user = res;
        }),
        catchError((err) => {
          throw new UnauthorizedException(err.message);
        }),
        map(() => true),
      );
  }
}
