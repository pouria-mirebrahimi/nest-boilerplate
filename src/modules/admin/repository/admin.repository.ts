import { Injectable } from '@nestjs/common';
import { AbsRepository } from '../../../common/lib/repository/repository';
import { Admin } from '../entity/admin.entity';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AdminRepository extends AbsRepository<Admin> {
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
