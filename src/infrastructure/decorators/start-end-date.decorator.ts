import type { ValidationArguments, ValidationOptions } from 'class-validator';
import { registerDecorator } from 'class-validator';

/**
 * Validates that the decorated date property comes before another date property
 * @param beforeProperty Name of the property that should come after
 * @param validationOptions Validation options
 */
export function DateBefore(beforeProperty: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'dateBefore',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [beforeProperty],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [laterDateProperty] = args.constraints;
          const laterDate = (args.object as any)[laterDateProperty];

          // Skip validation if either date is not present
          // (use @IsDefined or @IsDate separately to enforce presence)
          if (
            value === undefined ||
            value === null ||
            laterDate === undefined ||
            laterDate === null
          ) {
            return true;
          }

          // Convert to Date objects if they aren't already
          const date1 = value instanceof Date ? value : new Date(value);
          const date2 = laterDate instanceof Date ? laterDate : new Date(laterDate);

          return date1 < date2;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be before ${args.constraints[0]}`;
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
export function DateAfter(afterProperty: string, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'dateAfter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [afterProperty],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [earlierDateProperty] = args.constraints;
          const earlierDate = (args.object as any)[earlierDateProperty];

          if (
            value === undefined ||
            value === null ||
            earlierDate === undefined ||
            earlierDate === null
          ) {
            return true;
          }

          const date1 = value instanceof Date ? value : new Date(value);
          const date2 = earlierDate instanceof Date ? earlierDate : new Date(earlierDate);

          return date1 > date2;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be after ${args.constraints[0]}`;
        },
      },
    });
  };
}
