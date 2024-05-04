import { Injectable, Logger } from '@nestjs/common';
import { AV } from '../common/leancloud';
import {
  TicketStatusDto,
  // TicketStatusUpdateDto,
  TicketStatuCreateItemDto,
} from './dtos';

const MODEL_NAME = 'ticket-status';

@Injectable()
export class TicketStatusService {
  private readonly logger = new Logger('app:TicketStatusService');

  private MainModel: any;

  constructor() {
    const AVModel = AV.Object.extend(MODEL_NAME);
    this.MainModel = AVModel;
  }

  private createQuery() {
    const query = new AV.Query(MODEL_NAME);
    return query;
  }

  createWithOutSave(createDto: TicketStatuCreateItemDto): AV.Queriable {
    const data = {
      ...createDto,
    };

    const ins = new this.MainModel(data);

    return ins;
  }

  async findWithDatesAndProjectTitle(
    projectTitle: string,
    dates: string[],
  ): Promise<TicketStatusDto[]> {
    const query = this.createQuery();
    query.equalTo('projectTitle', projectTitle);
    // query.equalTo('date', date);
    query.containedIn('date', dates);

    const list = await query.find();

    return list as any[] as TicketStatusDto[];
  }

  async batchUpsert(ins: AV.Queriable[]): Promise<TicketStatusDto[]> {
    const list = await AV.Object.saveAll(ins as any[]);
    return list as any[] as TicketStatusDto[];
  }

  async findAll(
    eqMapper: Record<string, any>,
    skip?: number,
    limit?: number,
    sortAttr?: string,
    sortBy?: string,
  ): Promise<TicketStatusDto[]> {
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

    return list as any[] as TicketStatusDto[];
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

  async findByPk(pk: string): Promise<TicketStatusDto> {
    const query = this.createQuery();
    const instance = await query.get(pk);
    return instance as any as TicketStatusDto;
  }

  async findOne(eqMapper: Record<string, any>): Promise<TicketStatusDto> {
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

    return instance as any as TicketStatusDto;
  }

  async removeByPk(pk: string): Promise<TicketStatusDto> {
    const query = this.createQuery();
    const instance = await query.get(pk);

    await instance.destroy();

    return instance as any as TicketStatusDto;
  }
}
