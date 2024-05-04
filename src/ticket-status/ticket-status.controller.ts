import {
  Controller,
  Post,
  Get,
  // Put,
  // Delete,
  Body,
  Param,
  Logger,
  Query,
  UseInterceptors,
  Header,
  // Res,
  // Ip,
  // ParseIntPipe,
} from '@nestjs/common';

import { Response } from 'express';
import { ExpressResponse } from '../common/decorators';
import { AV } from '../common/leancloud';
import {
  ApiOperation,
  // ApiResponse,
  ApiTags,
  // ApiSecurity,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';

import { SerializerClass } from '../common/decorators';
import {
  // ParseJsonPipe, ParseArrayInt,
  ParseInt,
} from '../common/pipes';
import { SerializerInterceptor } from '../common/interceptors/serializer.interceptor';

import { TicketStatusService } from './ticket-status.server';
import { ProjectService } from '../projects/projects.server';

import {
  TicketStatusDto,
  TicketStatusUpdateDto,
  TicketStatusQueryWhereDto,
} from './dtos';

@Controller('api/ticket-status')
@ApiTags('ticket-status')
@UseInterceptors(SerializerInterceptor)
export class TicketStatusController {
  private readonly logger = new Logger('app:TicketStatusController');
  constructor(
    protected readonly service: TicketStatusService,
    protected readonly projectService: ProjectService,
  ) {}

  @Post('/batch-upsert')
  @ApiOperation({
    summary: '创建监听项目',
  })
  @SerializerClass(TicketStatusDto)
  async batchUpsert(
    @Body() inputData: TicketStatusUpdateDto,
    // @User() user: RequestUser,
  ): Promise<TicketStatusDto[]> {
    // 查找
    const list = await this.service.findWithDatesAndProjectTitle(
      inputData.projectTitle,
      inputData.items.map((item) => item.date),
    );

    const project = await this.projectService.findOne({
      title: inputData.projectTitle,
    });

    if (!project) {
      throw new Error('project not found');
    }

    /**
     * 根据 inputData.items[].status 更新 list, 没有则新增
     */
    const updateList = inputData.items.map((item) => {
      const found = list.find((l) => l.get('date') === item.date) as any as
        | AV.Queriable
        | undefined;

      if (found) {
        found.set('status', item.status);
        return found;
      }

      return this.service.createWithOutSave({
        date: item.date,
        projectTitle: inputData.projectTitle,
        status: item.status,
        projectId: (project as any).getObjectId(),
      });
    });

    return this.service.batchUpsert(updateList);
  }

  @Get()
  @ApiOperation({
    summary: '列表',
  })
  @ApiQuery({
    name: '_sort',
    description: '排序字段',
    required: false,
  })
  @ApiQuery({
    name: '_order',
    description: '排序方式',
    required: false,
  })
  @ApiQuery({
    name: 'filter',
    description: 'filter',
    required: false,
  })
  @ApiQuery({
    name: '_end',
    description: '结束索引',
    required: false,
  })
  @ApiQuery({
    name: '_start',
    description: '开始索引',
    required: false,
  })
  @SerializerClass(TicketStatusDto)
  @Header('Content-Type', 'application/json')
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  async list(
    @ExpressResponse() res: Response,
    @Query() where: TicketStatusQueryWhereDto = {},
    @Query('_start', ParseInt) start?: number,
    @Query('_end', ParseInt) end?: number,
    @Query('_sort') sort?: string,
    @Query('_order') order?: string,
  ): Promise<TicketStatusDto[]> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars

    const offset = start || 0;
    const limit = end - start > 0 ? end - start + 1 : 0;

    const [sortAttr, sortBy] = sort && order ? [sort, order] : ['', ''];

    const eqMapper = {
      ...where,
    };

    const list = await this.service.findAll(
      eqMapper,
      offset,
      limit,
      sortAttr,
      sortBy,
    );
    const count = await this.service.count(eqMapper);

    res.set('X-Total-Count', `ticket-status ${start}-${end}/${count}`);
    // res.json(list)

    return list;
  }

  @Get('/:pk')
  @ApiOperation({
    summary: '票务信息',
  })
  @SerializerClass(TicketStatusDto)
  @ApiParam({ name: 'pk', description: 'pk', type: String })
  async findByPk(@Param('pk') pk: string): Promise<TicketStatusDto> {
    const instance = await this.service.findByPk(pk);

    return instance;
  }
}
