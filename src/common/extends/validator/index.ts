import {
  Length as OriginLength,
  IsNumber as OriginIsNumber,
  IsInt as OriginIsInt,
  IsBoolean as OriginIsBoolean,
  IsString as OriginIsString,
  IsNotEmpty as OriginIsNotEmpty,
  IsOptional as OriginIsOptional,
  IsEnum as OriginIsEnum,
  IsArray as OriginIsArray,
  ValidateNested as OriginValidateNested,
  ArrayUnique as OriginArrayUnique,
  ArrayContains as OriginArrayContains,
  MinLength as OriginMinLength,
  MaxLength as OriginMaxLength,
  ArrayMinSize as OriginArrayMinSize,
  ArrayMaxSize as OriginArrayMaxSize,
  Min as OriginMin,
  Max as OriginMax,
  IsNumberOptions,
  ValidationOptions,
} from 'class-validator';

/**
 * Length 使用中文报错信息
 * @extends {OriginLength}
 */
export function Length(
  min: number,
  max?: number,
  validationOptions?: ValidationOptions,
) {
  return OriginLength(min, max, {
    ...validationOptions,
    message: '$property 长度错误',
  });
}

/**
 * IsNumber 使用中文报错信息
 * @extends {OriginIsNumber}
 */
export function IsNumber(
  options: IsNumberOptions = {},
  validationOptions?: ValidationOptions,
) {
  return OriginIsNumber(options, {
    ...validationOptions,
    message: '$property 必须数字格式',
  });
}

/**
 * IsInt 使用中文报错信息
 * @extends {IsInt}
 */
export function IsInt(validationOptions?: ValidationOptions) {
  return OriginIsInt({
    ...validationOptions,
    message: '$property 必须整数格式',
  });
}

/**
 * IsString
 * @extends {OriginIsString}
 */
export function IsString(validationOptions?: ValidationOptions) {
  return OriginIsString({
    ...validationOptions,
    message: '$property 必须为字符串',
  });
}

/**
 * IsNotEmpty 使用中文报错信息
 * @extends {OriginIsNotEmpty}
 */
export function IsNotEmpty(validationOptions?: ValidationOptions) {
  return OriginIsNotEmpty({
    ...validationOptions,
    message: '$property 不能为空',
  });
}

/**
 * IsEnum 使用中文报错信息
 * @extends {OriginIsEnum}
 */
export function IsEnum(entity: any, validationOptions?: ValidationOptions) {
  return OriginIsEnum(entity, {
    ...validationOptions,
    message: '$property 值不正确',
  });
}

/**
 * IsArray 使用中文报错信息
 * @extends {OriginIsArray}
 */
export function IsArray(validationOptions?: ValidationOptions) {
  return OriginIsArray({
    ...validationOptions,
    message: '$property 必须为数组格式',
  });
}

/**
 * IsBoolean 使用中文报错信息
 * @extends {OriginIsBoolean}
 */
export function IsBoolean(validationOptions?: ValidationOptions) {
  return OriginIsBoolean({
    ...validationOptions,
    message: '$property 必须为布尔',
  });
}

/**
 * ValidateNested 使用中文报错信息
 * @extends {OriginValidateNested}
 */
export function ValidateNested(validationOptions?: ValidationOptions) {
  return OriginValidateNested({
    ...validationOptions,
    message: '$property 格式错误',
  });
}

/**
 * ArrayUnique 使用中文报错信息
 * @extends {OriginArrayUnique}
 */
export function ArrayUnique(validationOptions?: ValidationOptions) {
  return OriginArrayUnique({
    ...validationOptions,
    message: '$property 元素不能重复',
  });
}

/**
 * ArrayContains 使用中文报错信息
 * @extends {OriginArrayContains}
 */
export function ArrayContains(
  values: any,
  validationOptions?: ValidationOptions,
) {
  return OriginArrayContains(values, {
    message: '$property 必须包含 $constraint1 中的值',
    ...validationOptions,
  });
}

/**
 * MaxLength 使用中文报错信息
 * @extends {OriginMaxLength}
 */
export function MaxLength(max: number, validationOptions?: ValidationOptions) {
  return OriginMaxLength(max, {
    message: '$property 长度不能超过 $constraint1',
    ...validationOptions,
  });
}

/**
 * MinLength 使用中文报错信息
 * @extends {OriginMinLength}
 */
export function MinLength(min: number, validationOptions?: ValidationOptions) {
  return OriginMinLength(min, {
    message: '$property 长度必须超过 $constraint1',
    ...validationOptions,
  });
}

/**
 * ArrayMinSize 使用中文报错信息
 * @extends {OriginArrayMinSize}
 */
export function ArrayMinSize(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return OriginArrayMinSize(min, {
    message: '$property 必须超过 $constraint1 个元素',
    ...validationOptions,
  });
}

/**
 * ArrayMaxSize 使用中文报错信息
 * @extends {OriginArrayMaxSize}
 */
export function ArrayMaxSize(
  min: number,
  validationOptions?: ValidationOptions,
) {
  return OriginArrayMaxSize(min, {
    message: '$property 不能多于 $constraint1 个元素',
    ...validationOptions,
  });
}

/**
 * Min 使用中文报错信息
 * @extends {OriginMin}
 */
export function Min(min: number, validationOptions?: ValidationOptions) {
  return OriginMin(min, {
    message: '$property 不能少于 $constraint1',
    ...validationOptions,
  });
}

/**
 * Max 使用中文报错信息
 * @extends {OriginMax}
 */
export function Max(max: number, validationOptions?: ValidationOptions) {
  return OriginMax(max, {
    message: '$property 不能多于 $constraint1',
    ...validationOptions,
  });
}

/**
 * just IsOptional
 * @extends {OriginMinLength}
 */
export const IsOptional = OriginIsOptional;
