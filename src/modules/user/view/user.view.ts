import { ViewEntity, ViewColumn, DataSource } from 'typeorm';
import { User as UserModel } from '../entity/user.entity';

const expression = (dataSource: DataSource) =>
  dataSource
    .createQueryBuilder()
    .select('user.id', 'id')
    .addSelect('user.name', 'userName')
    .addSelect('user.email', 'userEmail')
    .from(UserModel, 'user');

@ViewEntity({
  expression,
})
export class UserView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  userName: string;

  @ViewColumn()
  userEmail: string;
}
