import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator';

export const OptionalNumber = (description?: string, example?: number) =>
  applyDecorators(
    ApiPropertyOptional({
      description,
      example,
      nullable: true,
      type: Number,
    }),
    IsOptional(),
    Type(() => Number),
    IsNumber(),
  );

export const OptionalString = (
  description?: string,
  example?: string,
  maxLength?: number,
  minLength?: number,
) => {
  const decorators = [
    ApiPropertyOptional({
      description,
      example,
      type: String,
    }),
    IsOptional(),
    IsString(),
  ];

  if (minLength !== undefined) {
    decorators.push(MinLength(minLength));
  }

  if (maxLength !== undefined) {
    decorators.push(MaxLength(maxLength));
  }

  return applyDecorators(...decorators);
};

export const OptionalDate = (description: string, example?: string) =>
  applyDecorators(
    ApiPropertyOptional({ description, example, type: Date }),
    IsOptional(),
    Type(() => Date),
    IsDate(),
  );

export const OptionalDecNumber = (description: string, example?: number) =>
  applyDecorators(
    ApiPropertyOptional({
      description,
      example,
    }),
    IsOptional(),
    Transform(({ value }) => Number(value)),
    IsNumber({ maxDecimalPlaces: 2 }),
    Min(0),
  );
