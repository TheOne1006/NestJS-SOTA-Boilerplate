import {
  CallHandler,
  ExecutionContext,
  Injectable,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import {
  plainToInstance,
  ClassTransformOptions,
  ClassConstructor,
} from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isObject } from '@nestjs/common/utils/shared.utils';

import { SERIALIZER_CLASS, CLASS_SERIALIZER_OPTIONS } from '../constants';

export interface PlainLiteralObject {
  [key: string]: any;
}

@Injectable()
export class SerializerInterceptor extends ClassSerializerInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const contextOptions = this._getContextOptions(
      context,
      CLASS_SERIALIZER_OPTIONS,
    );

    const planClass = this._getContextOptions(context, SERIALIZER_CLASS);
    const options = {
      ...this.defaultOptions,
      ...contextOptions,
      planClass,
    };

    return next
      .handle()
      .pipe(
        map((res: PlainLiteralObject | Array<PlainLiteralObject>) =>
          this.serialize(res, options),
        ),
      );
  }

  serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: ClassTransformOptions & { planClass?: ClassConstructor<any> },
  ): PlainLiteralObject | PlainLiteralObject[] {
    const isArray = Array.isArray(response);
    const { planClass, ...otherOptions } = options;

    if (!isObject(response) && !isArray) {
      return response;
    }

    if (!planClass) {
      return response;
    }

    if (isArray) {
      return (response as PlainLiteralObject[]).map((item) =>
        this.transformPlanToClass(planClass, item, otherOptions),
      );
    }

    return this.transformPlanToClass(planClass, response, otherOptions);
  }

  transformPlanToClass(
    plainClass: ClassConstructor<any>,
    object: PlainLiteralObject,
    options: ClassTransformOptions,
  ): PlainLiteralObject {
    const formatObj = this.jsonFormatDocument(object);
    return plainToInstance(plainClass, formatObj, options);
  }

  jsonFormatDocument(doc: PlainLiteralObject) {
    if (typeof doc.toJSON === 'function') {
      return doc.toJSON();
    }
    return doc;
  }

  private _getContextOptions(context: ExecutionContext, key: string): any {
    return (
      this.reflector.get(key, context.getHandler()) ||
      this.reflector.get(key, context.getClass())
    );
  }
}
