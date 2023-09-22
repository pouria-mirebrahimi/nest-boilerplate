import { UpdateResult, FindOneOptions, Repository } from 'typeorm';
import { DataSource, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ObjectID } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { UserView } from '../view/user.view';

@Injectable()
export class UserViewRepository extends Repository<UserView> {
  constructor(private dataSource: DataSource) {
    super(UserView, dataSource.createEntityManager());
  }

  async queryOneByOption(
    option: FindOneOptions,
  ): Promise<UserView | undefined> {
    const found = await this.findOne(option);
    return found;
  }

  queryManyByOption(): Promise<UserView[]> {
    throw new Error('Method not implemented.');
  }
  queryCreate(): Promise<UserView> {
    throw new Error('Method not implemented.');
  }

  async queryUpdate(
    criteria:
      | string
      | number
      | FindOptionsWhere<UserView>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
    partialEntity: QueryDeepPartialEntity<UserView>,
  ): Promise<UpdateResult> {
    const updateResult = await this.update(criteria, partialEntity);
    return updateResult;
  }

  queryDelete(): void {
    throw new Error('Method not implemented.');
  }

  async queryOneById(id: number): Promise<UserView | undefined> {
    const result = await this.findOneBy({ id: id });
    return result;
  }

  async queryAllEntities(
    options?: FindManyOptions<UserView>,
  ): Promise<UserView[]> {
    const result = await this.find(options);
    return result;
  }
}
