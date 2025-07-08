import { Logger } from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsUrl,
  ValidationError,
  validateSync,
} from 'class-validator';
import { isDefined } from 'src/utils/isDefined';

// TODO: Implement custom expetions
// import {
//     ConfigVariableException,
//     ConfigVariableExceptionCode,
//} from 'src/modules/trimli-config/trimli-config.exception';

export class ConfigVariables {
  @IsOptional()
  NODE_PORT = 3000;

  @IsDefined()
  @IsUrl({
    protocols: ['mysql'],
    require_tld: false,
    allow_underscores: true,
    require_host: false,
  })
  DATABASE_URL: string;
}

export const validate = (config: Record<string, unknown>): ConfigVariables => {
  const validatedConfig = plainToClass(ConfigVariables, config);

  const validationErrors = validateSync(validatedConfig, {
    strictGroups: true,
  });

  const validationWarnings = validateSync(validatedConfig, {
    groups: ['warning'],
  });

  const logValidatonErrors = (
    errorCollection: ValidationError[],
    type: 'error' | 'warn',
  ) =>
    errorCollection.forEach((err: ValidationError) => {
      if (!isDefined(err?.constraints) || !isDefined(err?.property)) {
        return;
      }
      Logger[type](Object.values(err.constraints).join('\n'));
    });

  if (validationWarnings.length > 0) {
    logValidatonErrors(validationWarnings, 'warn');
  }

  if (validationErrors.length > 0) {
    logValidatonErrors(validationErrors, 'error');
    throw new Error('Config variables validation failed');
  }

  return validatedConfig;
};
