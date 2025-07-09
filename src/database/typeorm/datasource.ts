import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  override: true,
});

const isJest = process.argv.some((arg) => arg.includes('jest'));

export const typeORMModuleOptions: TypeOrmModuleOptions = {
  url: process.env.DATABASE_URL as string,
  type: 'mysql',
  logging: ['error'],
  entities: [`${isJest ? '' : 'dist/'}src/modules/**/*.entity{.ts,.js}`],
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: '_typeorm_migrations',
  migrations: [
    `${isJest ? '' : 'dist/'}src/database/typeorm/migrations/*{.ts,.js}`,
  ],
  autoLoadEntities: true,
};

export const dataSource = new DataSource(
  typeORMModuleOptions as DataSourceOptions,
);
