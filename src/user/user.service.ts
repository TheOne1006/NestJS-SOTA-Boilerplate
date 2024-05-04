// import * as _ from 'lodash';
import { Injectable, Logger } from '@nestjs/common';
import { AV } from '../common/leancloud';
import {
  // InputLoginDto,
  UserDto,
  LoginedUserDto,
} from './dtos';

const MODEL_NAME = '_User';

/**
 * User Service
 *
 */
@Injectable()
export class UserService {
  private readonly logger = new Logger('app:UserService');

  private MainModel: any;
  private Query: any;
  constructor() {
    this.MainModel = AV.User;
  }

  private createQuery() {
    const query = new AV.Query(MODEL_NAME);
    return query;
  }

  // 查找
  async findAll(sessionToken: string): Promise<UserDto[]> {
    const query = this.createQuery();
    const list = await query.find({
      sessionToken,
    });

    return list as any[] as UserDto[];
  }

  async findByPk(pk: string): Promise<UserDto> {
    const query = this.createQuery();
    const instance = await query.get(pk);
    return instance as any as UserDto;
  }

  /**
   * 登录
   * @returns Promise<UserDto>
   */
  async login(username: string, password: string): Promise<LoginedUserDto> {
    const userIns = await AV.User.logIn(username, password);

    // const roles = await userIns.getRoles();

    // 写入 关联
    // const roleQuery = new AV.Query(AV.Role);
    // const admin = await roleQuery.get('663511d3ae533a7a6001786e');
    // admin.getUsers().add(userIns);
    // await admin.save();

    const roles = await userIns.getRoles();
    // console.log(roles);

    const userData: LoginedUserDto = {
      username: userIns.getUsername(),
      id: userIns.getObjectId(),
      token: userIns.getSessionToken(),
      roles: roles.map((item) => item.getName()),
    };

    return userData;
  }
}
