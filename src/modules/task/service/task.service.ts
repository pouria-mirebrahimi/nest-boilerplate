import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  @Cron('45 * * * * *', { name: 'logger' })
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }

  @Interval(10000)
  handleInterval() {
    this.logger.debug('Called every 10 seconds');
  }

  @Timeout('notification', 5000)
  handleTimeout() {
    this.logger.debug('Called once after 5 seconds');
  }
}
