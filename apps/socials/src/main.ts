import { NestFactory } from '@nestjs/core';
import { SocialsModule } from './socials.module';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from '@app/common/swagger';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(SocialsModule);
  const configServices = app.get(ConfigService);
  app.setGlobalPrefix(configServices.get('API_PREFIX') || 'api');
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  setupSwagger(app, 'Socials');
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useLogger(app.get(Logger));

  const port = configServices.get('PORT');
  await app.listen(port);
}
bootstrap();
