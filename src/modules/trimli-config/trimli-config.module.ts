import { DynamicModule, Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  ConfigVariables,
  validate,
} from 'src/modules/trimli-config/config-variables';
import { ConfigurableModuleClass } from 'src/modules/trimli-config/trimli-config.module-definition';
import { TrimliConfigService } from 'src/modules/trimli-config/trimli-config.service';

@Global()
@Module({})
export class TrimliConfigModule extends ConfigurableModuleClass {
  static forRoot(): DynamicModule {
    const imports = [
      ConfigModule.forRoot({
        isGlobal: true,
        expandVariables: true,
        envFilePath: '.env',
        validate,
      }),
    ];

    return {
      module: TrimliConfigModule,
      imports,
      providers: [TrimliConfigService, ConfigVariables],
      exports: [TrimliConfigService],
    };
  }
}
