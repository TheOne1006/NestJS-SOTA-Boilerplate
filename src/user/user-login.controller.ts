import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiSecurity,
  ApiResponse,
} from '@nestjs/swagger';
import { SerializerInterceptor } from '../common/interceptors/serializer.interceptor';
import { SerializerClass } from '../common/decorators';
import { InputLoginDto, LoginedUserDto } from './dtos';

import { UserService } from './user.service';

@Controller(`users`)
@ApiSecurity('api_key')
@ApiTags('user')
@UseInterceptors(SerializerInterceptor)
@Controller('user')
export class UserLogingController {
  constructor(private readonly userService: UserService) {}

  /**
   * 登录
   */
  @Post('/login')
  @ApiOperation({
    summary: '登录',
  })
  @SerializerClass(LoginedUserDto)
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(
    @Body() input: InputLoginDto,
    // @User() _user: RequestUser,
  ): Promise<LoginedUserDto> {
    const loginedUser = await this.userService.login(
      input.username,
      input.password,
    );

    return loginedUser;
  }
}
