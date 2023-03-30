import { Module } from '@nestjs/common';
// service
import { TaskService } from './service/tasks.service';

@Module({
  providers: [TaskService],
})
export class TaskModule {}
