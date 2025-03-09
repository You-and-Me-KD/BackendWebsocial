import { NestFactory } from '@nestjs/core';
import { AuthsModule } from './auths.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { TransformInterceptor } from '@app/common/interceptor/transform.interceptor';
import * as cookieParser from 'cookie-parser';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { setupSwagger } from '@app/common/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AuthsModule);
  const configServices = app.get(ConfigService);
  app.setGlobalPrefix(configServices.get('API_PREFIX') || 'api');
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configServices.get('TCP_PORT'),
    },
  });
  setupSwagger(app, 'Auths', [AuthsModule]);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      // Cái này dùng để white list DTO khi gửi lên, nếu fields không được khai báo trong DTO thì sẽ bị loại bỏ
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new TransformInterceptor());

  app.useLogger(app.get(Logger));
  const httpPort = configServices.get('HTTP_PORT');

  await app.startAllMicroservices();
  await app.listen(httpPort);
}
bootstrap();
