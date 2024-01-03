import { ExceptionFilter, Inject, ArgumentsHost } from '@nestjs/common';
import { Response, Request } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { I18nService } from 'nestjs-i18n';

/**
 *
 * output error 数据
 */
interface IErrorData {
  /**
   * http 状态码
   */
  statusCode: number;
  /**
   * 自定义 code 码
   */
  code: number;
  /**
   * 响应消息
   */
  message: string;
  /**
   * 错误详情
   */
  stack?: string;
  /**
   * 访问地址
   */
  path?: string;
  /**
   * 错误类型
   */
  errorType?: string;
  /**
   * 时间戳
   */
  timestamp?: string;
}

/**
 * 扩展参数, 可覆盖 IErrorData
 */
interface IExtendData {
  message?: string;
  messages?: string;
}

/**
 * 异常处理 基础基础过滤器
 */
export abstract class BaseExceptionsFilter implements ExceptionFilter {
  protected readonly type: string = 'base';

  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) protected readonly logger: Logger,
    protected readonly i18n: I18nService,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    this.logger.warn(`in ${request.url}`);
    this.logger.error((exception as any).stack);

    throw new Error('Method is need rebuild.');
  }

  output(
    res: Response,
    statusCode: number,
    code: number,
    exception: Error,
    req: Request,
    ext: IExtendData = {},
  ) {
    const data: IErrorData = {
      statusCode: statusCode,
      code: code,
      message: exception.message,
    };

    if (process.env.NODE_ENV !== 'production') {
      data.path = req.url;
      data.stack = exception.stack;
      data.errorType = this.type;
      data.timestamp = new Date().toISOString();
    }

    res.status(statusCode).json({
      ...data,
      ...ext,
    });
  }
}
