import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import type { RoleEnum } from '@/prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { GuestOnlyGuard } from '../guards/guest-only.guard';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);

export function AdminOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles('ADMIN'));
}
export function TrainerOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles('TRAINER'));
}
export function ModeratorOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles('MODERATOR'));
}
export function UserOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles('USER'));
}

export function Unauthenticated() {
  return applyDecorators(UseGuards(GuestOnlyGuard));
}

export function Authenticated() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles('ADMIN', 'MODERATOR', 'TRAINER', 'USER'));
}

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(...roles));
}
