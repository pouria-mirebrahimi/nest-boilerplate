import { DataSource, FindManyOptions, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { CreateUserDto } from '../dto/user.dto';
import { AbsRepository } from '../../../common/lib/repository/repository';

@Injectable()
export class UserRepository extends AbsRepository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  queryOneByOption(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  queryManyByOption(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  queryCreate(): Promise<User> {
    throw new Error('Method not implemented.');
  }
  queryUpdate(): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
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
