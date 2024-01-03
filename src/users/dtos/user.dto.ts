import { Exclude } from 'class-transformer';

/**
 * UserDto
 */
export class UserDto {
  id: string;

  username: string;

  email: string;

  roles: string[];

  @Exclude()
  ip?: string;
}
