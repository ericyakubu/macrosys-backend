import type { ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object, propertyName: string) {
    registerDecorator({
      name: 'isValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: string) {
          // Password must contain at least one lowercase letter, one uppercase letter, and one number
          if (typeof value !== 'string') return false;
          const hasLowercase = /[a-z]/.test(value);
          const hasUppercase = /[A-Z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const length = value.length >= 8;
          return hasLowercase && hasUppercase && hasNumber && length;
        },
        defaultMessage() {
          return 'Password must contain at least one lowercase letter, one uppercase letter, one number and be at least 8 characters long.';
        },
      },
    });
  };
}
