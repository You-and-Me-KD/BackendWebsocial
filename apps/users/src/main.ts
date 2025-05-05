import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from '@app/common/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configServices = app.get(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configServices.get('TCP_PORT'),
    },
  });

  app.setGlobalPrefix(configServices.get('API_PREFIX') || 'api');
  setupSwagger(app, 'Users');
  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  app.useLogger(app.get(Logger));

  const httpPort = configServices.get('HTTP_PORT');
  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();
