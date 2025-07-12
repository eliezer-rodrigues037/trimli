import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const trimliConfigService = app.get(TrimliConfigService);

  const config = new DocumentBuilder()
    .setTitle('Trimli API')
    .setDescription('Simple URL shortener API')
    .setVersion(process.env.npm_package_version as string)
    .addSecurity('bearer', {
      scheme: 'bearer',
      type: 'http',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(trimliConfigService.get('PORT') ?? 3001);
}
bootstrap();
