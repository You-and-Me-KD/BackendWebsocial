import { NestFactory, Reflector } from '@nestjs/core';
import { AuthsModule } from './auths.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { setupSwagger } from '@app/common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthsModule);
  const configServices = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configServices.get('TCP_PORT'),
    },
  });

  app.enableCors({
    origin: configServices.get('CLIENT_URL'),
    credentials: true,
  });

  app.setGlobalPrefix(configServices.get('API_PREFIX') || 'api');
  setupSwagger(app, 'Auths', []);
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
