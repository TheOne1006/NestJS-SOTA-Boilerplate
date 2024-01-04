import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
/**
 * CreateUserDto
 */
export class CreateUserDto {
  @IsString({
    message: i18nValidationMessage('validation.STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @ApiProperty({
    example: 'username',
    description: '用户名',
  })
  @Length(2, 20, {
    message: i18nValidationMessage('validation.LENGTH'),
  })
  username: string;

  @IsEmail(null, {
    message: i18nValidationMessage('validation.EMAIL'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @ApiProperty({
    example: 'xxx@gmail.com',
    description: '邮箱',
  })
  email: string;

  @IsString({
    message: i18nValidationMessage('validation.STRING'),
  })
  @IsNotEmpty({
    message: i18nValidationMessage('validation.NOT_EMPTY'),
  })
  @Length(5, 20, {
    message: i18nValidationMessage('validation.LENGTH'),
  })
  @ApiProperty({
    example: 'password',
    description: '密码',
  })
  password: string;
}
