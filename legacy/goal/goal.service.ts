import { Injectable } from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
@Injectable()
export class GoalService {
  create(createGoalDto: CreateGoalDto) {
    return 'This action adds a new goal';
  }
}
