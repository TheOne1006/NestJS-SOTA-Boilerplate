import { NotFoundException } from '@nestjs/common';

import {
  Model as OriginModel,
  // HasMany,
} from 'sequelize-typescript';
import { FindOptions, Poolable } from 'sequelize';

/**
 * 扩展常用的 Model 方法
 *
 */
export abstract class Model<T = any, T2 = any> extends OriginModel<T, T2> {
  // sorting: number;

  constructor(values?: any, options?: any) {
    super(values, options);
  }

  /**
   * 查找一个实例, 未找到则报错
   * @param {FindOptions} options
   * @returns Promise
   */
  public static async findOneOrFail<M extends Model<M>>(
    this: { new (): M } & typeof Model,
    options?: FindOptions,
  ): Promise<M> {
    const instance = await this.findOne(options);
    if (!instance) {
      throw new NotFoundException(
        `Not found ${this.name} instance about ${JSON.stringify(options)}`,
      );
    }
    return instance as M;
  }

  /**
   * 根据id查找一个实例, 未找到则报错
   * @param {id} number id
   * @param {Poolable} options useMater
   * @returns Promise
   */
  public static async findByPkOrFail<M extends Model<M>>(
    this: { new (): M } & typeof Model,
    id: number,
    options?: Poolable,
  ): Promise<M> {
    const instance = await this.findOneOrFail({
      ...options,
      where: { id },
    });

    return instance as M;
  }
}
