import { Module } from '@nestjs/common';
import { TrimliConfigModule } from 'src/modules/trimli-config/trimli-config.module';
import { TypeORMModule } from 'src/modules/typeorm/typeorm.module';
import { LinkModule } from './modules/link/link.module';
import { RedirectModule } from './modules/redirect/redirect.module';

@Module({
  imports: [
    TrimliConfigModule.forRoot(),
    TypeORMModule,
    LinkModule,
    RedirectModule,
  ],
})
export class AppModule {}
