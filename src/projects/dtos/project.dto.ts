import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

import { IsNotEmpty } from 'class-validator';

class ProjectBaseDto {
  @ApiProperty({
    example: '',
    description: '描述',
  })
  desc: string;

  @ApiProperty({
    example: '',
    description: '',
  })
  title: string;
}

/**
 * 项目信息 dtos
 */
export class ProjectDto extends ProjectBaseDto {
  @Expose({
    name: 'objectId',
  })
  id: string;
}

export class ProjectCreateDto extends ProjectBaseDto {
  @IsNotEmpty()
  title: string;
}

export class ProjectUpdateDto {
  @ApiProperty({
    example: '',
    description: '描述',
  })
  desc: string;
}
