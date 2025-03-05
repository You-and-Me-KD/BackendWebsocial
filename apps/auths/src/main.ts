import { NestFactory } from '@nestjs/core';
import { AuthsModule } from './auths.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AuthsModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Cái này dùng để white list DTO khi gửi lên, nếu fields không được khai báo trong DTO thì sẽ bị loại bỏ
      whitelist: true,
      transform: true,
    }),
  );
  app.useLogger(app.get(Logger));
  const configServices = app.get(ConfigService);
  const port = configServices.get('PORT');
  await app.listen(port);
}
bootstrap();
