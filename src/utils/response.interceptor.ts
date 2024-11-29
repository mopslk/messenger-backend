import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { SuccessResponseType } from '@/utils/types';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessResponseType<T>> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<SuccessResponseType<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
        success: true,
      })),
    );
  }
}
