/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Request, Response } from 'express';

import { AuthMiddleware } from '../auth.middleware';
import { AuthService } from '../auth.service';

describe('AuthMiddleware', () => {
  let middleware: AuthMiddleware;
  let mockAuthService: AuthService;

  beforeAll(() => {
    mockAuthService = {
      checkWithCache: jest.fn().mockReturnValue({
        id: 'id1000',
        ip: '127.0.0.1',
        roles: ['super-admin'],
        username: 'u1000',
      }),
    } as any as AuthService;

    middleware = new AuthMiddleware(mockAuthService);
  });

  it('should be defined', () => {
    expect(middleware).toBeDefined();
  });

  describe('static parseMockToken()', () => {
    it('should parse token string', () => {
      const mockToken = '_mock1,textbooks-admin,super-admin';

      // @ts-ignore
      const actual = AuthMiddleware.parseMockToken(mockToken, '127.0.0.1');
      const expected = {
        id: '_mock1',
        username: '_mock1',
        roles: ['textbooks-admin', 'super-admin'],
        ip: '127.0.0.1',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('use()', () => {
    beforeAll(() => {
      mockAuthService = {
        checkWithCache: jest
          .fn()
          .mockReturnValueOnce({
            id: null,
            username: '',
            roles: [],
            ip: '',
          })
          .mockReturnValueOnce({
            id: 'uid100',
            username: 'uname',
            roles: ['super-admin'],
            ip: '10.1.2.1',
          }),
      } as any as AuthService;

      middleware = new AuthMiddleware(mockAuthService);
    });

    it('should return empty user', async () => {
      // const mockToken = '_mock1,textbooks-admin,super-admin';
      const mockReq = {
        headers: {},
      } as any as Request;

      const mockRes = {} as any as Response;
      const mockNext = jest.fn();
      await middleware.use(mockReq, mockRes, mockNext);

      const actual = mockReq['user'];

      const expected = {
        id: null,
        username: '',
        roles: [],
        ip: '',
      };

      expect(actual).toEqual(expected);
    });

    it('should return user with _mock', async () => {
      const mockToken = '_mock1,super-admin';
      const mockReq = {
        headers: {
          bktoken: mockToken,
        },
        ip: '127.0.0.1',
      } as any as Request;

      const mockRes = {} as any as Response;
      const mockNext = jest.fn();
      await middleware.use(mockReq, mockRes, mockNext);

      const actual = mockReq['user'];

      const expected = {
        id: '_mock1',
        username: '_mock1',
        roles: ['super-admin'],
        ip: '127.0.0.1',
      };

      expect(actual).toEqual(expected);
    });

    it('should return user with check', async () => {
      const token = 'bkToken';
      const mockReq = {
        headers: {
          token: token,
          'x-real-ip': '::1',
        },
      } as any as Request;

      const mockRes = {} as any as Response;
      const mockNext = jest.fn();
      await middleware.use(mockReq, mockRes, mockNext);

      const actual = mockReq['user'];

      const expected = {
        id: 'uid100',
        username: 'uname',
        roles: ['super-admin'],
      };

      expect(actual).toMatchObject(expected);
      expect(actual.ip).not.toEqual('::1');
    });
  });
});
