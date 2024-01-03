/**
 * 操作、访问用户信息
 */
export interface RequestUser {
  id: string;

  email: string;

  username: string;

  roles: string[];

  ip?: string;
}
