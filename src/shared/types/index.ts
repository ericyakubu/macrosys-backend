export * from './cookie.type';
export * from './request.type';
export * from './date-time.type';

export type ExpiresIn = '30m' | '1h' | '3h' | '6h' | '12h' | '1d' | '2d';

export interface ReturnWithTokens<T> {
  user: T;
  accessToken: string;
  refreshToken: string;
}

export enum SortOrderEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export interface Macros {
  calories?: number;
  carbohydrates?: number;
  fat?: number;
  fiber?: number;
  protein?: number;
  sugar?: number;
}
