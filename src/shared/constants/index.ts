// export * from './rate-limit';
// export * from './tokens';
import type { Cookie } from '@/shared/types';

export const BCRYPT_SALT_ROUNDS = 10;

export const Rate_Limit_Max_Tries_Name: string = 'rateLimitMaxTries';
export const Rate_Limit_Time_Name: string = 'rateLimitWindowMs';

export const Rate_Limit_Tries: number = 10; // limit each IP to 100 requests per windowMs
export const Rate_Limit_Time: number = 1000 * 60 * 60; // 1 hour

export const Rate_Limit_Message_Name: string = 'rateLimitMessage';

export const AccessToken: Cookie = {
  name: 'access_token',
  expiresIn: '6h',
  ttl: 1000 * 60 * 60 * 6, // 6 hours
} as const;

export const RefreshToken: Cookie = {
  name: 'refresh_token',
  expiresIn: '7d',
  ttl: 1000 * 60 * 60 * 24 * 7, // 7 days
} as const;

export const AuthErrors = {
  userAlreadyExists: 'User already exists',
  invalidCredentials: 'Invalid email or password',
  // passwordsDoNotMatch: 'Passwords do not match',
  invalidToken: 'Invalid token',
  userNotFound: 'User not found',
  invalidPassword: 'Invalid password',
  accessDenied: 'Access denied',
  //
  extractingUser: 'Error occurred while extracting user from db',
} as const;
