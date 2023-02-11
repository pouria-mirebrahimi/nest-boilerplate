import {
  DataSource,
  FindManyOptions,
  UpdateResult,
  FindOneOptions,
} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { AbsRepository } from '../../../common/lib/repository/repository';
import { FindOptionsWhere, ObjectID } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserRepository extends AbsRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async queryOneByOption(option: FindOneOptions): Promise<User | undefined> {
    const found = await this.findOne(option);
    return found;
  }

  queryManyByOption(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  queryCreate(): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async queryUpdate(
    criteria:
      | string
      | number
      | FindOptionsWhere<User>
      | Date
      | ObjectID
      | string[]
      | number[]
      | Date[]
      | ObjectID[],
    partialEntity: QueryDeepPartialEntity<User>,
  ): Promise<UpdateResult> {
    const updateResult = await this.update(criteria, partialEntity);
    return updateResult;
  }

  queryDelete(): void {
    throw new Error('Method not implemented.');
  }

  async queryOneById(id: number): Promise<User | undefined> {
    const result = await this.findOneBy({ id: id });
    return result;
  }

  async queryAllEntities(options?: FindManyOptions<User>): Promise<User[]> {
    const result = await this.find(options);
    return result;
  }

  async createEntity(body: CreateUserDto): Promise<User | undefined> {
    const { name, email } = body;

    const newUser = this.create({
      name,
      email,
    });

    return await this.save(newUser);
  }
}
