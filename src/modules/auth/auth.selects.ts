import type { Prisma } from '@/prisma/client';

export const USER_SELECT = {
  id: true,
  name: true,
  lastname: true,
  second_name: true,
  birthday: true,
  gender: true,
  language: true,
  phone: true,
  role: true,
  timezone: true,
  activity_level: true,
} satisfies Prisma.UserSelect;

export const TRAINER_SELECT = {
  id: true,
  name: true,
  lastname: true,
  second_name: true,
  birthday: true,
  gender: true,
  language: true,
  phone: true,
  role: true,
  timezone: true,
  accepting_clients: true,
} satisfies Prisma.TrainerSelect;
