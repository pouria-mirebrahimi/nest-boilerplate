import { Module } from '@nestjs/common';
// service
import { TaskService } from './service/task.service';

@Module({
  providers: [TaskService],
})
export class TaskModule {}
