import { NestFactory } from '@nestjs/core';
import { ChatsModule } from './chats.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common/swagger';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import { Logger } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ChatsModule);
  const configServices = app.get(ConfigService);
  app.setGlobalPrefix(configServices.get('API_PREFIX') || 'api');
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  setupSwagger(app, 'Chats');
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useLogger(app.get(Logger));

  const port = configServices.get('PORT');
  await app.listen(port);
}
bootstrap();
