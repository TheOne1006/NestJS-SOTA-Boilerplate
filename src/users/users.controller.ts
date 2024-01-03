import { Controller, Get, UseInterceptors, UseGuards } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiResponse,
} from '@nestjs/swagger';

import { SerializerInterceptor } from '../common/interceptors/serializer.interceptor';
import { Roles, SerializerClass, User } from '../common/decorators';
import { RolesGuard } from '../common/auth';
import { ROLE_AUTHENTICATED } from '../common/constants';
import { RequestUser } from '../common/interfaces';
import { UserDto } from './dtos/user.dto';

import { config } from '../../config';

const prefix = config.API_V1;

@UseGuards(RolesGuard)
@Roles(ROLE_AUTHENTICATED)
@Controller(`${prefix}/user`)
@ApiSecurity('api_key')
@ApiTags('user')
@UseInterceptors(SerializerInterceptor)
@Controller('users')
export class UsersController {
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
  async getUserCurrent(@User() user: RequestUser): Promise<UserDto> {
    return user;
  }
}
