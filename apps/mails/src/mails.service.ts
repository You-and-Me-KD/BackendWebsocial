import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Nodemailer from 'nodemailer';
import fs from 'node:fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export class MailsService {
  private readonly transporter: Nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = Nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST', { infer: true }),
      port: this.configService.get('MAIL_PORT', { infer: true }),
      secure: this.configService.get('MAIL_SECURE', { infer: true }),
      auth: {
        user: this.configService.get('MAIL_USER', { infer: true }),
        pass: this.configService.get('MAIL_PASSWORD', { infer: true }),
      },
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
