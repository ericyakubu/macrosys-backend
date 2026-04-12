export type TimeUnit = 's' | 'm' | 'h' | 'd';
export interface Cookie {
  name: string;
  expiresIn: `${number}${TimeUnit}` | number;
  ttl: number;
}
