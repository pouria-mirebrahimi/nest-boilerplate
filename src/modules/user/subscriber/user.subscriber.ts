import { EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import * as moment from 'moment-timezone';
// entity
import { User } from '../entity/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async afterLoad(user: User): Promise<void> {
    try {
      const now = new Date();
      console.log(user.createdAt);
      console.log(now);
      const duration = moment(now).diff(moment(user.createdAt), 'seconds');
      console.log(`duration: ${duration}`);
    } catch (e) {
      console.log(e);
    }
  }
}
