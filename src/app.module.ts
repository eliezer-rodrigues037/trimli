import { Module } from '@nestjs/common';
import { TrimliConfigModule } from 'src/modules/trimli-config/trimli-config.module';

@Module({
  imports: [
    // ConfigModule.forRoot({
    //   isGlobal: true,
    // }),
    TrimliConfigModule.forRoot(),
  ],
})
export class AppModule {}
