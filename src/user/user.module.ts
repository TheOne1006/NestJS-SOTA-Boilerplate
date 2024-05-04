/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { UserLogingController } from './user-login.controller';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AuthModule } from '../common/auth';

@Module({
  imports: [AuthModule],
  controllers: [UserLogingController, UserController],
  providers: [UserService],
})
export class UserModule {}
