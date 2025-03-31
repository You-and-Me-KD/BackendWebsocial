import { NestFactory } from '@nestjs/core';
import { MailsModule } from './mails.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(MailsModule);
  const configServices = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useLogger(app.get(Logger));

  const port = configServices.get('PORT');
  await app.listen(port);
}
bootstrap();
