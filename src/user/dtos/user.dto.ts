import { Exclude, Expose } from 'class-transformer';
/**
 * UserDto
 */
export class UserDto {
  @Expose({
    name: 'objectId',
  })
  id: string;

  username: string;

  email?: string;

  @Exclude()
  shortId?: string;

  @Exclude()
  emailVerified?: boolean;

  @Exclude()
  mobilePhoneVerified?: boolean;

  @Exclude()
  salt?: string;

  @Exclude()
  password?: string;
}
