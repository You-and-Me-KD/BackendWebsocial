import {
  BadRequestException,
  ErrorCode,
  handleServiceException,
  LoginDto,
  MAIL_SERVICE,
  MICRO_SERVICE_KEYS,
  REDIS_CLIENT,
  RegisterDto,
  ResendEmailRegisterDto,
  ResendForgotPasswordDto,
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
import { VerifyTokenDto } from '@app/common/dto/verify-token.dto';
import { RedisService } from '@app/common/redis/redis.services';
import { ResetPasswordDto } from '@app/common/dto/reset-password.dto';

@Injectable()
export class AuthsService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(REDIS_CLIENT) private readonly redisServices: RedisService,
    @Inject(USERS_SERVICE) private readonly userClient: ClientProxy,
    @Inject(MAIL_SERVICE) private readonly mailClient: ClientProxy,
  ) {}
  async verifyUser({ email, password, username }: LoginDto) {
    try {
      const user = await lastValueFrom(
        this.userClient.send(MICRO_SERVICE_KEYS.USERS.FIND_ONE_USER, {
          email,
          username,
        }),
      );
      if (!user.isVerify) {
        throw new UnauthorizedException(ErrorCode.USER_NOT_VERIFY);
      }

      const isMatchPassword = await bcryptjs.compare(
        password,
        user.hashedPassword,
      );
      if (!isMatchPassword) {
        throw new UnauthorizedException(ErrorCode.CREDENTIAL_NOT_MATCH);
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
    const request: { email: string; token?: string } = {
      email: data.email,
    };
    const token = await this.generateToken({
      ...request,
      type: 'verify',
    });
    request['token'] = token;
    const user = await lastValueFrom(
      this.userClient.send(MICRO_SERVICE_KEYS.USERS.REGISTER, data),
    );

    await this.mailClient
      .send(MICRO_SERVICE_KEYS.MAILS.VERIFY_REGISTER, request)
      .forEach(() => {});
    return user;
  }

  async verifyToken(data: VerifyTokenDto) {
    try {
      const verify = await this.jwtService.verifyAsync(data.token, {
        secret: this.configService.get<string>('VERIFY_MAIL_SECRET', {
          infer: true,
        }),
      });
      return await lastValueFrom(
        this.userClient.send(MICRO_SERVICE_KEYS.USERS.VERIFY_TOKEN, {
          email: verify.email,
        }),
      );
    } catch (error) {
      handleServiceException(error.message, BadRequestException);
    }
  }

  async sendMailRegister(data: ResendEmailRegisterDto) {
    try {
      const key = 'verify_register_' + data.email;
      const isExists = await this.redisServices.incr(key);
      if (isExists === 1) {
        await this.redisServices.expire(
          key,
          this.configService.get<number>('VERIFY_MAIL_EXPIRES_IN', {
            infer: true,
          }),
        );
      }
      if (isExists > 3) {
        throw new BadRequestException(ErrorCode.TOO_MANY_REQUESTS_SEND_EMAIL);
      }
      const request: { email: string; token?: string } = {
        email: data.email,
      };
      const token = await this.generateToken({
        ...data,
        type: 'verify',
      });
      request['token'] = token;
      await this.mailClient
        .send(MICRO_SERVICE_KEYS.MAILS.VERIFY_REGISTER, request)
        .forEach(() => {});
    } catch (error) {
      handleServiceException(error.message, BadRequestException);
    }
  }

  async generateToken(data: { email: string; type: 'verify' | 'forgot' }) {
    const secretKey =
      data.type === 'verify'
        ? this.configService.get<string>('VERIFY_MAIL_SECRET', { infer: true })
        : this.configService.get<string>('FORGOT_PASSWORD_SECRET', {
            infer: true,
          });
    const expiresIn =
      data.type === 'verify'
        ? this.configService.get<string>('VERIFY_MAIL_EXPIRES_IN', {
            infer: true,
          })
        : this.configService.get<string>('FORGOT_PASSWORD_EXPIRES_IN', {
            infer: true,
          });
    return await this.jwtService.signAsync(
      { email: data.email },
      {
        secret: secretKey,
        expiresIn: `${expiresIn}s`,
      },
    );
  }

  async forgotPassword(data: ResendForgotPasswordDto) {
    const email = data.email;

    try {
      const user = await lastValueFrom(
        this.userClient.send(MICRO_SERVICE_KEYS.USERS.FIND_ONE_USER, {
          email,
        }),
      );
      if (!user) {
        throw new BadRequestException(ErrorCode.NOT_FOUND);
      }
      const key = 'forgot_password' + data.email;
      const isExists = await this.redisServices.incr(key);
      if (isExists === 1) {
        await this.redisServices.expire(
          key,
          this.configService.get<number>('FORGOT_PASSWORD_EXPIRES_IN', {
            infer: true,
          }),
        );
      }
      if (isExists > 3) {
        throw new BadRequestException(ErrorCode.TOO_MANY_REQUESTS_SEND_EMAIL);
      }
      const token = await this.generateToken({ email, type: 'forgot' });
      const request = { email, token };
      await this.mailClient
        .send(MICRO_SERVICE_KEYS.MAILS.FORGOT_PASSWORD, request)
        .forEach(() => {});
    } catch (error) {
      handleServiceException(error.message, BadRequestException);
    }
  }
  async resetPassword(data: ResetPasswordDto) {
    const { newPassword, token } = data;
    try {
      const verify = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('FORGOT_PASSWORD_SECRET', {
          infer: true,
        }),
      });
      const user = await lastValueFrom(
        this.userClient.send(MICRO_SERVICE_KEYS.USERS.FIND_ONE_USER, {
          email: verify.email,
        }),
      );
      if (!user) {
        throw new BadRequestException(ErrorCode.NOT_FOUND);
      }
      return await lastValueFrom(
        this.userClient.send(MICRO_SERVICE_KEYS.USERS.RESET_PASSWORD, {
          ...user,
          password: newPassword,
        }),
      );
    } catch (error) {
      handleServiceException(error.message, BadRequestException);
    }
  }
}
