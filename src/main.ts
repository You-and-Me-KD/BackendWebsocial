import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.useGlobalPipes(
    new ValidationPipe({
      // Cái này dùng để white list DTO khi gửi lên, nếu fields không được khai báo trong DTO thì sẽ bị loại bỏ
      whitelist: true,
    }),
  );
  await app.listen(2802);
}
bootstrap();
