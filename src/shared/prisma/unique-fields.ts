import type { Prisma } from '@/prisma/client';

export function uniqueFields(e: Prisma.PrismaClientKnownRequestError): string[] {
  const meta = e.meta as any;
  const target = meta?.target ?? meta?.driverAdapterError?.cause?.constraint?.fields;
  if (Array.isArray(target)) return target;
  if (typeof target === 'string') return [target]; // sometimes a constraint name like "Account_email_key"
  return [];
}
