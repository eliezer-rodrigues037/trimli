import { Module } from '@nestjs/common';
import { TrimliConfigModule } from 'src/modules/trimli-config/trimli-config.module';
import { TypeORMModule } from 'src/modules/typeorm/typeorm.module';

@Module({
  imports: [TrimliConfigModule.forRoot(), TypeORMModule],
})
export class AppModule {}
