import { RequestUser } from '../../common/interfaces/request-user.interface';
/**
 * LoginedUserDto
 */
export class LoginedUserDto implements RequestUser {
  id: string;

  username: string;

  token: string;

  roles: string[];
}
