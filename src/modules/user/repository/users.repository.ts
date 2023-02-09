import { DataSource, FindManyOptions, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from '../entity/users.entity';
import { CreateUserDto } from '../dto/users.dto';
import { AbsRepository } from '../../../common/lib/repository/repository';

@Injectable()
export class UsersRepository extends AbsRepository<Users> {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  queryOneByOption(): Promise<Users> {
    throw new Error('Method not implemented.');
  }
  queryManyByOption(): Promise<Users[]> {
    throw new Error('Method not implemented.');
  }
  queryCreate(): Promise<Users> {
    throw new Error('Method not implemented.');
  }
  queryUpdate(): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  queryDelete(): void {
    throw new Error('Method not implemented.');
  }

  async queryOneById(id: number): Promise<Users | undefined> {
    const result = await this.findOneBy({ id: id });
    return result;
  }

  async queryAllEntities(options?: FindManyOptions<Users>): Promise<Users[]> {
    const result = await this.find(options);
    return result;
  }

  async createEntity(body: CreateUserDto): Promise<Users | undefined> {
    const { name, email } = body;

    const newUser = this.create({
      name,
      email,
    });

    return await this.save(newUser);
  }
}
