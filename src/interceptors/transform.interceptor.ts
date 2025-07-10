import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isDefined } from 'src/utils/isDefined';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, T | T[]> {
  constructor(private readonly classType: ClassConstructor<T>) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<T | T[]> {
    return next.handle().pipe(
      map((data) => {
        if (!isDefined(data)) return data;

        if (Array.isArray(data)) {
          return data.map((dataItem) => {
            const instance = plainToInstance(this.classType, dataItem);
            return instanceToPlain(instance, {
              excludeExtraneousValues: false,
            }) as T;
          });
        }

        const instance = plainToInstance(this.classType, data);
        return instanceToPlain(instance, {
          excludeExtraneousValues: false,
        }) as T;
      }),
    );
  }
}
