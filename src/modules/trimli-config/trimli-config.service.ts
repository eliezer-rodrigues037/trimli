import { Injectable, Logger } from '@nestjs/common';

// import { isString } from 'class-validator';

// import { NodeEnvironment } from 'src/engine/core-modules/twenty-config/interfaces/node-environment.interface';

// import { ConfigVariables } from 'src/engine/core-modules/twenty-config/";

import { ConfigService } from '@nestjs/config';
import { ConfigVariables } from 'src/modules/trimli-config/config-variables';

@Injectable()
export class TrimliConfigService {
  private readonly logger = new Logger(TrimliConfigService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly defaultConfigVariables: ConfigVariables,
  ) {}

  get<T extends keyof ConfigVariables>(key: T): ConfigVariables[T] {
    return this.configService.get<ConfigVariables[T]>(
      key,
      this.defaultConfigVariables[key],
    );
  }
}
