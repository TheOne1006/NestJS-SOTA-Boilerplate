import { Injectable } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

/**
 * @ignore
 */
@Injectable()
export class AppService {
  constructor(private readonly i18n: I18nService) {}
  /**
   * @ignore
   */
  async getHello(): Promise<string> {
    return this.i18n.t('global.HELLO_MESSAGE', {
      lang: I18nContext.current().lang,
      args: [{ username: 'world' }],
    });
  }
}
