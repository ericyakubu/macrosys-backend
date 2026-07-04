import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RoleEnum } from '@/prisma/client';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

// const Roles = (...roles: StaffRoleEnum[]) => SetMetadata('roles', roles);

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);

export function AdminOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(RoleEnum.ADMIN));
}
export function TrainerOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(RoleEnum.TRAINER));
}
export function ModeratorOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(RoleEnum.MODERATOR));
}
export function UserOnly() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(RoleEnum.USER));
}

export function Unauthenticated() {
  return applyDecorators(UseGuards(JwtAuthGuard), SetMetadata('authenticated', false));
}

export function Authenticated() {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(RoleEnum.ADMIN, RoleEnum.MODERATOR));
}

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(UseGuards(JwtAuthGuard), Roles(...roles));
}
