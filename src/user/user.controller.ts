import {
  Controller,
  Get,
  // Post,
  // Body,
  UseInterceptors,
  UseGuards,
  // ValidationPipe,
  Header,
  // ParseIntPipe,
  Param,
  // Res,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import type { Response } from 'express';
import { ExpressResponse } from '../common/decorators/express-res.decorator';

import { SerializerInterceptor } from '../common/interceptors/serializer.interceptor';
import { Roles, SerializerClass, User } from '../common/decorators';
import { RolesGuard } from '../common/auth';
import { ROLE_AUTHENTICATED, ROLE_SUPER_ADMIN } from '../common/constants';
import { RequestUser } from '../common/interfaces';
import { UserDto } from './dtos';

import { UserService } from './user.service';

@UseGuards(RolesGuard)
@Roles(ROLE_AUTHENTICATED)
@Controller(`users`)
@ApiSecurity('api_key')
@ApiTags('user')
@UseInterceptors(SerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  /**
   * 获取所有用户信息
   *
   */
  @Get()
  @Header('Access-Control-Expose-Headers', 'X-Total-Count')
  @ApiOperation({
    summary: '用户信息',
  })
  @Roles(ROLE_SUPER_ADMIN)
  @SerializerClass(UserDto)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async list(
    @ExpressResponse() res: Response,
    @User() user: RequestUser,
  ): Promise<UserDto[]> {
    const users = await this.userService.findAll(user.token);
    res.set('X-Total-Count', `${users.length}`);
    return users;
  }

  /**
   * 获取用户自身数据
   *
   * @param user
   */
  @Get('/current')
  @ApiOperation({
    summary: '获取当前用户',
  })
  @SerializerClass(UserDto)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async getUserCurrent(@User() user: RequestUser): Promise<RequestUser> {
    const fixFormatUserIns = { ...user, objectId: user.id };
    return fixFormatUserIns;
  }

  /**
   * 根据 id 查找
   */
  @Get(':id')
  @Roles(ROLE_SUPER_ADMIN)
  @ApiOperation({
    summary: ' 根据 id 查找用户',
  })
  @ApiParam({
    name: 'id',
    example: '1',
    description: '用户 id',
    type: String,
  })
  @SerializerClass(UserDto)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async findByPk(@Param('id') pk: string): Promise<UserDto> {
    const ins = await this.userService.findByPk(pk);
    return ins;
  }
}
