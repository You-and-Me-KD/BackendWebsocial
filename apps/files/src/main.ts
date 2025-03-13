import { NestFactory } from '@nestjs/core';
import { FilesModule } from './files.module';
import { ConfigService } from '@nestjs/config';
import cookieParser from 'cookie-parser';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import { setupSwagger } from '@app/common/swagger';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(FilesModule);
  const configServices = app.get(ConfigService);
  app.setGlobalPrefix(configServices.get('API_PREFIX') || 'api');
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  setupSwagger(app, 'Files');
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useLogger(app.get(Logger));

  const port = configServices.get('PORT');
  await app.listen(port);
}
bootstrap();
