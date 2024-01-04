import {
  ROLE_AUTHENTICATED,
  ROLE_SUPER_ADMIN,
} from '../../src/common/constants';

const initUsers = [
  {
    id: 1,
    username: 'John',
    email: '2ddd@xxx.com',
    salt: '1233',
    password: 'xxxxx',
    roles: [ROLE_AUTHENTICATED, ROLE_SUPER_ADMIN],
  },
];

export default [...initUsers];
