import {
  type ValidationArguments,
  type ValidationOptions,
  registerDecorator,
} from 'class-validator';

export function IsExactlyOneOf(properties: string[], validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isExactlyOneOf',
      target: object.constructor,
      propertyName,
      constraints: [properties],
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const obj = args.object as Record<string, unknown>;
          const props = args.constraints[0] as string[];

          const count = props.filter((p) => obj[p] != null).length;

          return count === 1;
        },

        defaultMessage(args: ValidationArguments) {
          const props = args.constraints[0];
          return `Exactly one of ${props.join(', ')} must be provided.`;
        },
      },
    });
  };
}
