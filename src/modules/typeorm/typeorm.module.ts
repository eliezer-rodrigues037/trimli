import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeORMModuleOptions } from 'src/database/typeorm/datasource';

import { TrimliConfigModule } from 'src/modules/trimli-config/trimli-config.module';

// eslint-disable-next-line @typescript-eslint/require-await
const typeORMFactory = async (): Promise<TypeOrmModuleOptions> => ({
  ...typeORMModuleOptions,
});

@Module({
  imports: [
    TrimliConfigModule,
    TypeOrmModule.forRootAsync({
      useFactory: typeORMFactory,
    }),
  ],
})
export class TypeORMModule {}
