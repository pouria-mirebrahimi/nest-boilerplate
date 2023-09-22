import { UpdateResult, DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { AbstractRepository } from '../../../common/lib/repository/abstract-repository';
import { Admin } from '../entity/admin.entity';

@Injectable()
export class AdminRepository extends AbstractRepository<Admin> {
  constructor(private readonly dataSource: DataSource) {
    super(Admin, dataSource);
  }

  async queryOneById(id: number): Promise<Admin> {
    const found = await this.findOneBy({ id });
    return found;
  }
  async queryOneByOption(): Promise<Admin> {
    throw new Error('Method not implemented.');
  }
  queryManyByOption(): Promise<Admin[]> {
    throw new Error('Method not implemented.');
  }
  queryCreate(): Promise<Admin> {
    throw new Error('Method not implemented.');
  }
  queryUpdate(): Promise<UpdateResult> {
    throw new Error('Method not implemented.');
  }
  queryDelete(): void {
    throw new Error('Method not implemented.');
  }
}
