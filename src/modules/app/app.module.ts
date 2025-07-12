import { Module } from '@nestjs/common';
import { AuthModule } from 'src/modules/auth/auth.module';
import { LinkModule } from 'src/modules/link/link.module';
import { RedirectModule } from 'src/modules/redirect/redirect.module';
import { TrimliConfigModule } from 'src/modules/trimli-config/trimli-config.module';
import { TypeORMModule } from 'src/modules/typeorm/typeorm.module';
import { UserModule } from 'src/modules/user/user.module';

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
