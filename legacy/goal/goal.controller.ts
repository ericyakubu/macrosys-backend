import { Controller, Post, Body } from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UserOnly } from '@/shared/decorators';
import { ApiTags } from '@nestjs/swagger';

@UserOnly()
@ApiTags('Goal')
@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Post()
  create(@Body() createGoalDto: CreateGoalDto) {
    return this.goalService.create(createGoalDto);
  }
}
