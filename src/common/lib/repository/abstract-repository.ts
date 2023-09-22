import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindOneOptions, EntityTarget, DataSource } from 'typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { FindOptionsWhere, ObjectID } from 'typeorm';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { AbstractEntity } from './abstract-entity';

export abstract class AbstractRepository<
  E extends AbstractEntity,
> extends Repository<E> {
  constructor(target: EntityTarget<E>, dataSource: DataSource) {
    super(target, dataSource.createEntityManager());
  }

  async queryOneById(id: number): Promise<E> {
    return this.findOne({ where: { id } } as FindOneOptions<E>);
  }

  abstract queryOneByOption(option: FindOneOptions<E>): Promise<E>;
  abstract queryManyByOption(
    option: FindManyOptions<E>,
  ): Promise<E[] | undefined>;
  abstract queryCreate(entityLike: DeepPartial<E>): Promise<E>;
  abstract queryUpdate(
    criteria:
      | string
      | number
      | FindOptionsWhere<E>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
    partialEntity: QueryDeepPartialEntity<E>,
  ): Promise<UpdateResult>;
  abstract queryDelete(
    criteria:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindOptionsWhere<E>,
  ): void;
}
