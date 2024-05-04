import * as dotenv from 'dotenv';

/**
 * 启动 .env 配置信息
 */
dotenv.config();

/**
 * @ignore
 * 配置项接口
 */
export interface Iconfig {
  leancloud: {
    appId: string;
    appKey: string;
    serverURL?: string;
    masterKey?: string;
  };
  logger: {
    appName: string;
    level: string;
    filename?: string;
    timestamp?: boolean;
    uncolorize?: boolean;
  };
  language: string;
  swagger: {
    enable: boolean;
    endPoint: string;
  };
  port: number | string;
  APP_CONFIG: {
    JWT_SECRET: string;
    JWT_SECRET_EXPIRESIN: string; // token 过期时间
  };
}

/**
 * @ignore
 * 默认配置信息
 */
export const config: Iconfig = {
  leancloud: {
    appId: process.env.LEANCLOUD_APP_ID || '',
    appKey: process.env.LEANCLOUD_APP_KEY || '',
    masterKey: process.env.LEANCLOUD_APP_MASTER_KEY || '',
    serverURL: process.env.LEANCLOUD_APP_SERVERURL || '',
  },
  language: 'zh-cn',
  logger: {
    appName: 'example',
    level: 'info',
    timestamp: true,
    // filename: 'log/all.log',
  },
  swagger: {
    enable: true,
    endPoint: 'api',
  },
  port: process.env.PORT || 3000,
  APP_CONFIG: {
    JWT_SECRET: process.env.JWT_SECRET || 'sksjdkjakjuuyqqwqxxzffqqwewewqqwe',
    JWT_SECRET_EXPIRESIN: process.env.JWT_SECRET_EXPIRESIN || '10d', // token 过期时间
  },
};
