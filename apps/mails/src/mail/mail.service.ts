import { Injectable } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';
import * as path from 'path';
import { VerifyRegisterDto } from '../dto/verify-register.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly emailDir: string;
  constructor(
    private readonly configService: ConfigService,
    private readonly mailer: MailerService,
  ) {
    this.emailDir = path.join(
      process.cwd(),
      'apps',
      'mails',
      'src',
      'templates',
    );
  }

  async sendVerifyRegister(data: VerifyRegisterDto): Promise<boolean> {
    try {
      await this.mailer.sendMail({
        templatePath: path.join(this.emailDir, 'verify-register.hbs'),
        context: {
          title: 'Verify your email address',
          url: `${this.configService.get('APP_URL', {
            infer: true,
          })}/en/verify?token=${data.token}`,
        },
        to: data.email,
        subject: 'Verify your email address',
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  async sendForgotPassword(data: VerifyRegisterDto): Promise<boolean> {
    try {
      await this.mailer.sendMail({
        templatePath: path.join(this.emailDir, 'forgot-password.hbs'),
        context: {
          title: 'Forgot Password',
          url: `${this.configService.get('APP_URL', {
            infer: true,
          })}/en/forgot-password?token=${data.token}`,
        },
        to: data.email,
        subject: 'Forgot Password',
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
