import { UpdateResult, FindOneOptions, Repository } from 'typeorm';
import { DataSource, FindManyOptions } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, ObjectID } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { AbstractRepository } from '@app-common/lib';
import { UserView } from '../view/user.view';

@Injectable()
export class UserViewRepository extends AbstractRepository<UserView> {
  constructor(private dataSource: DataSource) {
    super(UserView, dataSource);
  }
}
