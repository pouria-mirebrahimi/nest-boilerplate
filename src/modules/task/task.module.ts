import { Module } from '@nestjs/common';
// module
import { UserModule } from '../user/user.module';
// service
import { TaskService } from './service/task.service';

@Module({
  imports: [UserModule],
  providers: [TaskService],
})
export class TaskModule {}
