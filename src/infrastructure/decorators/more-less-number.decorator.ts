import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

/**
 * Validates that the decorated date property comes before another date property
 * @param beforeProperty Name of the property that should come after
 * @param validationOptions Validation options
 */
export function MoreThan(beforeProperty: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'dateBefore',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [beforeProperty],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [biggerNumberProperty] = args.constraints;
          const biggerNumber = (args.object as any)[biggerNumberProperty];

          // Skip validation if either date is not present
          // (use @IsDefined or @IsDate separately to enforce presence)
          if (
            value === undefined ||
            value === null ||
            biggerNumber === undefined ||
            biggerNumber === null
          ) {
            return true;
          }

          // Convert to Date objects if they aren't already
          const number1 = value instanceof Number ? value : Number(value);
          const number2 = biggerNumber instanceof Number ? biggerNumber : Number(biggerNumber);

          return number1 < number2;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be bigger than ${args.constraints[0]}`;
        },
      },
    });
  };
}

/**
 * Validates that the decorated date property comes after another date property
 * @param afterProperty Name of the property that should come before
 * @param validationOptions Validation options
 */
export function LessThan(afterProperty: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'dateAfter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [afterProperty],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [lowerNumberProperty] = args.constraints;
          const lowerNumber = (args.object as any)[lowerNumberProperty];

          if (
            value === undefined ||
            value === null ||
            lowerNumber === undefined ||
            lowerNumber === null
          ) {
            return true;
          }

          const number1 = value instanceof Number ? value : Number(value);
          const number2 = lowerNumber instanceof Number ? lowerNumber : Number(lowerNumber);

          return number1 > number2;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be less than ${args.constraints[0]}`;
        },
      },
    });
  };
}
