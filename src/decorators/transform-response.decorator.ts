import { UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

export function TransformResponse<T>(classType: T) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return UseInterceptors(new TransformInterceptor(classType as any));
}
