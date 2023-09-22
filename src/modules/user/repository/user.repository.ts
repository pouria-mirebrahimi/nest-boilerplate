import { DataSource, FindManyOptions } from 'typeorm';
import { UpdateResult, FindOneOptions } from 'typeorm';
import { FindOptionsWhere, ObjectID } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { AbstractRepository } from '../../../common/lib/repository/abstract-repository';

@Injectable()
export class UserRepository extends AbstractRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource);
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

  async queryAllEntities(options?: FindManyOptions<User>): Promise<User[]> {
    const result = await this.find(options);
    return result;
  }

  async queryAllUsersAndCountRoles(): Promise<User[]> {
    const queryBuilder = this.createQueryBuilder('user');
    const found = await queryBuilder
      .leftJoinAndSelect('user.roles', 'role')
      .loadRelationCountAndMap('user.rolesCount', 'user.roles')
      .addSelect("CONCAT(user.name, ' | ', user.email)", 'fullName')
      .getMany();

    return found;
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
