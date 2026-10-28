import type { UserGoal } from '@/prisma/client';

export class CreateGoalReqDto implements Partial<UserGoal> {}
