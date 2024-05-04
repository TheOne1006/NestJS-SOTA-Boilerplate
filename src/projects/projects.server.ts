import { Injectable, Logger } from '@nestjs/common';
import { AV } from '../common/leancloud';
import {
  ProjectDto,
  ProjectCreateDto,
  ProjectUpdateDto,
  // ProjectQueryWhereDto,
} from './dtos';

const MODEL_NAME = 'projects';

@Injectable()
export class ProjectService {
  private readonly logger = new Logger('app:ProjectService');

  private MainModel: any;

  constructor() {
    const AVModel = AV.Object.extend(MODEL_NAME);
    this.MainModel = AVModel;
  }

  private createQuery() {
    const query = new AV.Query(MODEL_NAME);
    return query;
  }

  async create(createDto: ProjectCreateDto) {
    const data = {
      ...createDto,
    };

    const ins = new this.MainModel(data);

    await ins.save();

    return ins;
  }

  async findAll(
    eqMapper: Record<string, any>,
    skip?: number,
    limit?: number,
    sortAttr?: string,
    sortBy?: string,
  ): Promise<ProjectDto[]> {
    const query = this.createQuery();

    if (eqMapper) {
      for (const key in eqMapper) {
        if (Object.prototype.hasOwnProperty.call(eqMapper, key)) {
          const val = eqMapper[key];
          query.equalTo(key, val);
        }
      }
    }

    if (skip) {
      query.skip(skip);
    }

    if (limit) {
      query.limit(limit);
    }

    if (sortAttr && sortBy) {
      if (sortBy === 'ASC') {
        query.addAscending(sortAttr);
      } else {
        query.addDescending(sortAttr);
      }
    }

    const list = await query.find();

    return list as any[] as ProjectDto[];
  }

  async count(eqMapper: Record<string, any>): Promise<number> {
    const query = this.createQuery();

    if (eqMapper) {
      for (const key in eqMapper) {
        if (Object.prototype.hasOwnProperty.call(eqMapper, key)) {
          const val = eqMapper[key];
          query.equalTo(key, val);
        }
      }
    }

    const num = await query.count();

    return num;
  }

  async findByPk(pk: string): Promise<ProjectDto> {
    const query = this.createQuery();
    const instance = await query.get(pk);
    return instance as any as ProjectDto;
  }

  async findOne(eqMapper: Record<string, any>): Promise<ProjectDto> {
    const query = this.createQuery();

    if (eqMapper) {
      for (const key in eqMapper) {
        if (Object.prototype.hasOwnProperty.call(eqMapper, key)) {
          const val = eqMapper[key];
          query.equalTo(key, val);
        }
      }
    }

    const instance = await query.first();

    return instance as any as ProjectDto;
  }

  async updateByPk(
    pk: string,
    updateDto: ProjectUpdateDto,
  ): Promise<ProjectDto> {
    const query = this.createQuery();
    const ins = await query.get(pk);

    for (const key in updateDto) {
      if (Object.prototype.hasOwnProperty.call(updateDto, key)) {
        const value = updateDto[key];
        ins.set(key, value);
      }
    }

    await ins.save();

    return ins as any as ProjectDto;
  }

  async removeByPk(pk: string): Promise<ProjectDto> {
    const query = this.createQuery();
    const instance = await query.get(pk);

    await instance.destroy();

    return instance as any as ProjectDto;
  }
}
