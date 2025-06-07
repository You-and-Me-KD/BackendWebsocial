import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'node:fs/promises';
import Handlebars from 'handlebars';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class MailerService {
  protected readonly logger = new Logger(MailerService.name);

  constructor(private readonly configService: ConfigService) {
    const apiKey = this.configService.get<string>('MAIL_PASSWORD', {
      infer: true,
    });
    if (!apiKey) {
      this.logger.error('Missing SENDGRID_API_KEY');
      return;
    }

    sgMail.setApiKey(apiKey);
    this.logger.log('SendGrid Mailer initialized');
  }

  async sendMail({
    templatePath,
    context,
    ...mailOptions
  }: {
    templatePath: string;
    context: Record<string, any>;
    to: string;
    subject: string;
    from?: string;
  }): Promise<void> {
    try {
      const template = await fs.readFile(templatePath, 'utf-8');
      const html = Handlebars.compile(template)(context);

      await sgMail.send({
        to: mailOptions.to,
        from: mailOptions?.from
          ? mailOptions.from
          : (this.configService.get<string>('MAIL_FROM', {
              infer: true,
            }) as string),
        subject: mailOptions.subject,
        html,
      });

      this.logger.log(`Email sent to ${mailOptions.to}`);
    } catch (error) {
      this.logger.error('Failed to send email', error);
    }
  }
}
