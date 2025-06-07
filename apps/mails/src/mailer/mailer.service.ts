import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as Nodemailer from 'nodemailer';
import * as fs from 'node:fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private readonly transporter: Nodemailer.Transporter;
  protected readonly logger = new Logger(MailerService.name);
  constructor(private readonly configService: ConfigService) {
    this.transporter = Nodemailer.createTransport({
      host: this.configService.get<string>('MAIL_HOST', { infer: true }),
      port: this.configService.get<number>('MAIL_PORT', { infer: true }),
      secure: this.configService.get<boolean>('MAIL_SECURE', { infer: true }),
      ignoreTLS: this.configService.get<boolean>('MAIL_IGNORE_TLS', {
        infer: true,
      }),
      requireTLS: this.configService.get<boolean>('MAIL_REQUIRE_TLS', {
        infer: true,
      }),
      auth: {
        user: this.configService.get<string>('MAIL_USER', { infer: true }),
        pass: this.configService.get<string>('MAIL_PASSWORD', { infer: true }),
      },
      logger: true,
      debug: true,
    });
    this.transporter.verify((error) => {
      if (error) {
        this.logger.error('Error connect SMTP', error);
      } else {
        this.logger.log('Connect SMTP successfully');
      }
    });
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: Nodemailer.SendMailOptions & {
    templatePath: string;
    context: Record<string, any>;
  }): Promise<void> {
    let html: string | undefined;
    if (templatePath) {
      const template = await fs.readFile(templatePath, 'utf-8');
      html = Handlebars.compile(template, {
        strict: true,
      })(context);
    }
    this.transporter.sendMail({
      ...mailOptions,
      from: mailOptions?.from
        ? mailOptions.from
        : this.configService.get('MAIL_FROM'),
      html: mailOptions.html ? mailOptions.html : html,
    });
  }
}
