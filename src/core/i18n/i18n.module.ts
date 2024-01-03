import { Module } from '@nestjs/common';
import * as path from 'path';
import { I18nModule } from 'nestjs-i18n';
import { config } from '../../../config';

/**
 * i18n 路径
 * 注意: 与 dist 中的目录保持一致
 *
 */
const i18nFilePath = path.join(__dirname, '../..', 'i18n');

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: config.language, // e.g., 'zh-cn'
      loaderOptions: {
        // dist 位置与 src 不一致
        path: i18nFilePath,
      },
    }),
  ],
  controllers: [],
})
export class AppI18nModule {}
