import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IsNotEmpty } from 'class-validator';

class TicketStatusBaseDto {
  @ApiProperty({
    example: '',
    description: '项目名称',
  })
  projectTitle: string;

  @ApiProperty({
    example: '',
    description: '日期',
  })
  // 日期
  date: string;
  @ApiProperty({
    example: '',
    description: '状态',
  })
  status: string;
}

/**
 *  门票状态 dtos
 */
export class TicketStatusDto extends TicketStatusBaseDto {
  @Expose({
    name: 'objectId',
  })
  id: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  projectId: string;
}

export class TicketStatusUpsertItemDto extends TicketStatusBaseDto {
  @ApiProperty({
    example: '',
    description: '项目名称',
  })
  @IsNotEmpty()
  projectTitle: string;

  @ApiProperty({
    example: '',
    description: '日期',
  })
  @IsNotEmpty()
  date: string;

  @ApiProperty({
    example: '',
    description: '状态',
  })
  @IsNotEmpty()
  status: string;
}

export class TicketStatuCreateItemDto extends TicketStatusBaseDto {
  @ApiProperty({
    example: '',
    description: '',
  })
  projectId: string;
}
