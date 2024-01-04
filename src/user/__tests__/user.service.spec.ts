import { SequelizeModule, getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user.entity';
import { UserService } from '../user.service';
import { CoreModule } from '../../core/core.module';

describe('UserService', () => {
  let service: UserService;
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [CoreModule, SequelizeModule.forFeature([User])],
      providers: [UserService],
    }).compile();

    service = moduleRef.get<UserService>(UserService);
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  describe('base test', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('READ', () => {
    describe('findAll()', () => {
      it('should return user list', async () => {
        console.log(service.findAll);
        const users = await service.findAll();
        console.log(users);
        expect(users.length).toBeGreaterThan(0);
      });
    });
  });
});
