import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(UsersModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // Cái này dùng để white list DTO khi gửi lên, nếu fields không được khai báo trong DTO thì sẽ bị loại bỏ
      whitelist: true,
      transform: true,
    }),
  );
  await app.listen(process.env.port ?? 2802);
}
bootstrap();
