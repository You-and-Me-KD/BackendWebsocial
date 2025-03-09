import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication, Type } from '@nestjs/common';

export function setupSwagger(
  app: INestApplication,
  serviceName: string,
  modules: Type<any>[] = [],
) {
  const options = new DocumentBuilder()
    .setTitle(`${serviceName} API`)
    .setDescription(`API documentation for ${serviceName}`)
    .setVersion('1.0')
    .addBearerAuth() // Add JWT authentication globally
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: modules,
  });
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true, // Keep JWT token on refresh
    },
  });
}
