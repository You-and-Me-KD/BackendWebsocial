import { NestFactory } from '@nestjs/core';
import { MailsModule } from './mail/mails.module';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MailsModule);
  const configServices = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configServices.get('TCP_PORT'),
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useLogger(app.get(Logger));
  // const httpPort = configServices.get('HTTP_PORT');
  await app.startAllMicroservices();
  // await app.listen(httpPort);
}
bootstrap();
