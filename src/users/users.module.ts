import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { AuthModule } from '../common/auth';

@Module({
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
