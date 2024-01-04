import { Exclude } from 'class-transformer';

/**
 * UserDto
 */
export class UserDto {
  id: number;

  username: string;

  email: string;

  roles: string[];

  @Exclude()
  ip?: string;
}
