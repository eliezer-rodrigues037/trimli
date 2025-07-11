import { Module } from '@nestjs/common';
import { TrimliConfigModule } from 'src/modules/trimli-config/trimli-config.module';
import { TypeORMModule } from 'src/modules/typeorm/typeorm.module';
import { AuthModule } from './modules/auth/auth.module';
import { LinkModule } from './modules/link/link.module';
import { RedirectModule } from './modules/redirect/redirect.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TrimliConfigModule.forRoot(),
    TypeORMModule,
    AuthModule,
    LinkModule,
    RedirectModule,
    UserModule,
  ],
})
export class AppModule {}
