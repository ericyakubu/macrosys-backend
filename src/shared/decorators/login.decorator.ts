import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsValidLogin(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsValidLogin',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          // Password must contain at least one lowercase letter, one uppercase letter, and one number
          if (typeof value !== 'string') return false;
          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          // const hasNumber = /[0-9]/.test(value);
          const allowedChars = /^[A-Za-z0-9_-]+$/.test(value);
          const length = value.length >= 5;
          const maxLength = value.length <= 50;
          // return hasLowercase && hasUppercase && hasNumber && length;
          return hasLowercase && hasUppercase && length && allowedChars && maxLength;
        },
        defaultMessage() {
          return 'Login must contain at least one lowercase letter, one uppercase letter, must not contain special characters (except for - and _) and be between 5 and 50 characters long.';
        },
      },
    });
  };
}
