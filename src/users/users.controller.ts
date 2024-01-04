import {
  Controller,
  Get,
  Post,
  Body,
  UseInterceptors,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiResponse,
} from '@nestjs/swagger';

import { SerializerInterceptor } from '../common/interceptors/serializer.interceptor';
import { Roles, SerializerClass, User } from '../common/decorators';
import { RolesGuard } from '../common/auth';
import { ROLE_AUTHENTICATED, ROLE_SUPER_ADMIN } from '../common/constants';
import { RequestUser } from '../common/interfaces';
import { UserDto, CreateUserDto, UpdatePasswordDto } from './dtos';

import { config } from '../../config';
import { UsersService } from './users.service';

const prefix = config.API_V1;

@UseGuards(RolesGuard)
@Roles(ROLE_AUTHENTICATED)
@Controller(`${prefix}/user`)
@ApiSecurity('api_key')
@ApiTags('user')
@UseInterceptors(SerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
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

  /**
   * 注册用户
   *
   * @param user
   */
  @Post('/create')
  @Roles(ROLE_SUPER_ADMIN)
  @ApiOperation({
    summary: '创建新用户',
  })
  @SerializerClass(CreateUserDto)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async create(
    @Body() newUserDto: CreateUserDto,
    // @User() _user: RequestUser,
  ): Promise<UserDto> {
    const newUser = await this.userService.create(newUserDto);

    return newUser;
  }

  /**
   * 修改密码
   *
   * @param user
   */
  @Post('/changePassword')
  @ApiOperation({
    summary: '更新密码',
  })
  @SerializerClass(CreateUserDto)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async updatePassword(
    @Body(new ValidationPipe()) newPassword: UpdatePasswordDto,
    @User() selfUser: RequestUser,
  ): Promise<UserDto> {
    const newUser = await this.userService.updatePasswordByPk(
      selfUser.id,
      newPassword.password,
    );

    return newUser;
  }
}
