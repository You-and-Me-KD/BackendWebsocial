import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer';
import * as fs from 'node:fs/promises';
import Handlebars from 'handlebars';

@Injectable()
export class MailerService {
  private readonly transporter: Nodemailer.Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = Nodemailer.createTransport({
      service: this.configService.get<string>('MAIL_SERVICE', { infer: true }),
      auth: {
        user: this.configService.get<string>('MAIL_USER', { infer: true }),
        pass: this.configService.get<string>('MAIL_PASSWORD', { infer: true }),
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
