import { NestFactory } from '@nestjs/core';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const trimliConfigService = app.get(TrimliConfigService);

  await app.listen(trimliConfigService.get('PORT') ?? 3001);
}
bootstrap();
