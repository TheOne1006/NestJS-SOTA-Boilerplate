import { Test, TestingModule } from '@nestjs/testing';

import {
  getModelToken,
  SequelizeModule } from '@nestjs/sequelize';

import { Material } from '../../../textbooks/entities/material.entity';
import { CoreModule } from '../../../core/core.module';

describe('extends ExtendModel', () => {
  let CurModel: typeof Material;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        CoreModule,
        SequelizeModule.forFeature([Material]),
      ],
    }).compile();

  CurModel = moduleRef.get(getModelToken(Material));
  });

  describe('base test', () => {
    it('should be defined', () => {
      expect(CurModel).toBeDefined();
    });
  });

  describe('findOneOrFail', () => {
    it('should throw error', async () => {
      let err: any;
      try {
        await CurModel.findOneOrFail({
          where: {
            id: 100000,
          }
        })
      } catch (error) {
        err = error;
      }

      expect(err.message).toMatch('Not found Material instance about {\"where\":{\"id\":100000}}');
    });

    it('should match', async () => {
      const instance = await CurModel.findOneOrFail({
        where: {
          id: 36001,
        }
      });

      const expected = {
        id: 36001,
      }

      expect(instance.toJSON()).toMatchObject(expected);
    });
  });

  describe('findByPkOrFail', () => {
    it('should throw error', async () => {
      let err: any;
      try {
        await CurModel.findByPkOrFail(100000)
      } catch (error) {
        err = error;
      }

      expect(err.message).toMatch('Not found Material instance about {\"where\":{\"id\":100000}}');
    });

    it('should match', async () => {
      const instance = await CurModel.findByPkOrFail(36001);

      const expected = {
        id: 36001,
      }

      expect(instance.toJSON()).toMatchObject(expected);
    });
  });

});
