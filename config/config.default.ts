import { Dialect } from 'sequelize/types';
import { join } from 'path';

/**
 * @ignore
 * 配置项接口
 */
export interface Iconfig {
  sequelize: {
    username?: string;
    password?: any;
    database?: string;
    host: string;
    storage: string;
    dialect: Dialect;
    logging: any;
    timezone?: string;
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
  }
};

/**
 * @ignore
 * 默认配置信息
 */
export const config: Iconfig = {
  sequelize: {
    username: 'root',
    password: null,
    storage: join(__dirname, '../..','./databases/db/database.dev.sqlite'),
    host: 'localhost',
    dialect: 'sqlite' as Dialect,
    logging: console.log,
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
};
